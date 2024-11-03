import { Queue, Worker } from "bullmq";
import { defaultQueueConfig, redisConnection } from "../config/queue.js";
import fs from "fs";
import csvParser from "csv-parser";
import { WeatherData } from "../models/weatherdata.model.js";
import { promisify } from "util";
import { sendInChunksWithDelay } from "../helpers.js";

export const csvQueueName = "csvQueue";

export const csvQueue = new Queue(csvQueueName, {
	connection: redisConnection,
	defaultJobOptions: {
		...defaultQueueConfig,
	},
});

const unlinkAsync = promisify(fs.unlink);

export const csvWorker = new Worker(
	csvQueueName,
	async (job) => {
		const { filePath, userId } = job.data;
		const batchSize = 5000;
		let batch = [];

		return new Promise((resolve, reject) => {
			const stream = fs.createReadStream(filePath).pipe(csvParser());

			stream
				.on("data", async (data) => {
					// console.log(`[csvWorker] Received data row: ${JSON.stringify(data)}`);
					batch.push({
						time: new Date(data.time),
						temperature_2m: String(data.temperature_2m),
					});
					if (batch.length >= batchSize) {
						stream.pause();
						try {
							await WeatherData.insertMany(batch);
							await sendInChunksWithDelay(batch, userId);
							batch = [];
							stream.resume();
						} catch (err) {
							console.error("[csvWorker] Error inserting batch:", err);
							stream.destroy();
							reject(err);
						}
					}
				})
				.on("end", async () => {
					// Insert any remaining data in batch after stream ends
					if (batch.length > 0) {
						try {
							await WeatherData.insertMany(batch);
							await sendInChunksWithDelay(batch, userId);
						} catch (error) {
							console.error("[csvWorker] Error inserting final batch:", error);
							reject(error);
							return;
						}
					}

					// Attempt to delete the file after processing
					try {
						await unlinkAsync(filePath);
						console.log(`[csvWorker] File deleted: ${filePath}`);
					} catch (err) {
						console.error(`[csvWorker] Error deleting file: ${filePath}`, err);
					}
					resolve();
				})
				.on("error", (err) => {
					console.error("[csvWorker] Error processing CSV:", err);
					reject(err);
				});
		});
	},
	{
		connection: redisConnection,
	}
);

csvWorker.on("completed", (job) => {
	console.log(`Job completed: ${job.id}`);
});

csvWorker.on("failed", (job, error) => {
	console.error(`Job failed: ${job.id}`, error);
});

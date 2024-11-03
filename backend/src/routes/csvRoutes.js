import express from "express";
import path from "path";
import multer from "multer";
import { ZodError } from "zod";
import { csvQueue, csvQueueName } from "../jobs/csvQueue.js";
import { WeatherData } from "../models/weatherdata.model.js";
import { limiter } from "../config/rateLimits.js";
import { formatZodError } from "../helpers.js";
import { uploadFileSchema } from "../validations/uploadFileValidation.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "src/public/uploads/");
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cb(null, uniqueSuffix + "-" + file.originalname);
	},
});
const upload = multer({ storage });

router.post("/upload", authMiddleware, limiter, upload.single("file"), async (req, res) => {
	try {
		const payload = uploadFileSchema.parse({
			body: req.body,
			file: req.file,
		});

		if (!req.file) {
			return res.status(400).json({ message: "Please upload a CSV file", success: false });
		}

		await csvQueue.add(csvQueueName, {
			filePath: path.resolve(req.file.path),
			userId: payload.body.userId,
		});

		return res.status(200).json({
			message: "File uploaded and processing started",
			success: true,
		});
	} catch (error) {
		console.error(error);
		if (error instanceof ZodError) {
			const errors = formatZodError(error);
			res.status(422).json({ errors, status: 422 });
		} else {
			res.status(500).json({ message: "Internal server error", success: false });
		}
	}
});

router.get("/data", authMiddleware, limiter, async (req, res) => {
	try {
		const { limit = 10, cursor } = req.query;
		const query = cursor ? { _id: { $gt: cursor } } : {};
		const data = await WeatherData.find(query).sort({ _id: 1 }).limit(parseInt(limit));
		const hasNextPage = data.length === parseInt(limit);
		const nextCursor = hasNextPage ? data[data.length - 1]._id : null;
		return res.status(200).json({ data, pagination: { hasNextPage, nextCursor } });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Failed to fetch data", error });
	}
});

export default router;

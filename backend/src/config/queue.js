import IORedis from "ioredis";

export const redisConnection = new IORedis.default({
	host: process.env.REDIS_HOST,
	port: 6379,
	maxLoadingRetryTime: null,
	maxRetriesPerRequest: null,
});

export const defaultQueueConfig = {
	removeOnComplete: {
		count: 20,
		age: 60 * 10,
	},
	attempts: 3,
	backoff: {
		type: "exponential",
		delay: 1000,
	},
	removeOnFail: false,
};

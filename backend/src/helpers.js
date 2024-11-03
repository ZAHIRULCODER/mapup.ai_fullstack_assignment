import { io } from "./index.js";

export const sendInChunksWithDelay = async (data, userId, delay = 1500) => {
	const chunkSize = 50;
	for (let i = 0; i < data.length; i += chunkSize) {
		const chunk = data.slice(i, i + chunkSize);
		io.to(userId.toString()).emit("progress", chunk);
		await new Promise((resolve) => setTimeout(resolve, delay)); 
	}
};

export const formatZodError = (error) => {
	let errors = {};
	error.errors?.map((issue) => {
		errors[issue.path?.[0]] = issue.message;
	});

	return errors;
};

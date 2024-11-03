import { z } from "zod";

export const uploadFileSchema = z.object({
	body: z.object({
		userId: z.string().min(1, "User ID is required"), 
	}),
	file: z
		.object({
			originalname: z.string().regex(/\.csv$/, "Only CSV files are allowed"),
			path: z.string().min(1), 
		})

});

import { z } from "zod";

export const signupSchema = z.object({
	name: z.string({ message: "Name is required" }).min(3, { message: "Name must be 3 characters long" }),
	email: z.string({ message: "Email is required" }).email({ message: "Please enter correct email" }),
	password: z
		.string({ message: "Password is required" })
		.min(6, { message: "Password must be 6 characters long" }),
});

export const loginSchema = z.object({
	email: z.string({ message: "Email is required." }).email({ message: "Please enter correct email" }),
	password: z.string({ message: "Password is required" }),
});


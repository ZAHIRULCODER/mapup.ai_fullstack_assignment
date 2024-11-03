import express from "express";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { loginSchema, signupSchema } from "../validations/authValidation.js";
import { ZodError } from "zod";
import { formatZodError } from "../helpers.js";
import { authLimiter } from "../config/rateLimits.js";

const router = express.Router();

router.post("/signup", authLimiter, async (req, res) => {
	try {
		const body = req.body;
		const payload = signupSchema.parse(body);

		const user = await User.findOne({ email: payload.email });
		if (user) {
			return res.status(409).json({ message: "User is already exist, you can login", success: false });
		}
		const hashedPassword = await bcrypt.hash(payload.password, 10);
		const userModel = new User({ name: payload.name, email: payload.email, password: hashedPassword });
		await userModel.save();
		return res.status(201).json({
			message: "Signed-up successfully",
			success: true,
		});
	} catch (error) {
		console.log(error);
		if (error instanceof ZodError) {
			const errors = formatZodError(error);
			res.status(422).json({ errors, status: 422 });
		} else {
			res.status(500).json({
				message: "Internal server error",
				success: false,
			});
		}
	}
});

router.post("/login", authLimiter, async (req, res) => {
	try {
		const body = req.body;
		const payload = loginSchema.parse(body);
		const user = await User.findOne({ email: payload.email });
		if (!user) {
			return res.status(403).json({ message: "No user found with this email", success: false });
		}
		const isPassEqual = await bcrypt.compare(payload.password, user.password);
		if (!isPassEqual) {
			return res.status(403).json({ message: "Invalid Credentials", success: false });
		}
		const jwtToken = jwt.sign({ email: user.email, _id: user._id }, process.env.JWT_SECRET, {
			expiresIn: "10d",
		});

		return res.status(200).json({
			message: "Logged-in successfully",
			success: true,
			jwtToken,
			_id: user._id,
			email: user.email,
			name: user.name,
		});
	} catch (error) {
		console.log(error);
		if (error instanceof ZodError) {
			const errors = formatZodError(error);
			res.status(422).json({ errors, status: 422 });
		} else {
			res.status(500).json({
				message: "Internal server error",
				success: false,
			});
		}
	}
});

export default router;

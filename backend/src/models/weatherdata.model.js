import mongoose from "mongoose";

const WeatherDataSchema = new mongoose.Schema(
	{
		time: {
			type: Date,
			required: true,
			index: true,
		},
		temperature_2m: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export const WeatherData = mongoose.model("WeatherData", WeatherDataSchema);

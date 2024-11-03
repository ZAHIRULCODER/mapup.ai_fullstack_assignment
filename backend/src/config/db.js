import mongoose from "mongoose";

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI, {
			dbName: process.env.DB_NAME,
		});
		console.log("MongoDB connected");
	} catch (error) {
		console.error(error.message);
		process.exit(1);
	}
};

export default connectDB;

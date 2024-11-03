import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
	const auth = req.headers["authorization"];
	if (!auth) {
		return res.status(403).json({ message: "Unauthorized, JWT token is require" });
	}
	try {
		const decoded = jwt.verify(auth, process.env.JWT_SECRET);
		req.user = decoded;
		next();
	} catch (err) {
		return res.status(403).json({ message: "Unauthorized, JWT token wrong or expired" });
	}
};

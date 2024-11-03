export function setupSocket(io) {
	io.on("connection", (socket) => {
		console.log(`User connected: ${socket.id}`);

		socket.on("join", (userId) => {
			socket.join(userId);
			console.log(`User ${userId} joined room`);
		});

		socket.on("disconnect", () => {
			console.log(`User disconnected: ${socket.id}`);
		});
	});
}

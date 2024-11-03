import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { socket } from "../App";

import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
	const [data, setData] = useState([]);

	useEffect(() => {
		socket.on("connect", () => {
			console.log("WS Connected to server");
		});

		socket.emit("join", localStorage.getItem("_id"));

		socket.on("progress", (newData) => {
			setData((prev) => [
				...prev,
				...newData.map((item) => ({
					time: new Date(item.time).getFullYear(),
					temperature_2m: Number(item.temperature_2m),
				})),
			]);
		});

		return () => socket.off("progress");
	}, []);

	return (
		<div className="flex">
			<Sidebar />
			<div className="grow ml-16 md:ml-64 h-full lg:h-screen text-gray-900">
				<Navbar />
				<div>
					<Outlet context={data} />
				</div>
			</div>
		</div>
	);
};

export default DashboardLayout;

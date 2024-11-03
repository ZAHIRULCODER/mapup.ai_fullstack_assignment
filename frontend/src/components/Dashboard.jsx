import React, { useEffect, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
	Chart as ChartJS,
	LineElement,
	BarElement,
	CategoryScale,
	LinearScale,
	PointElement,
} from "chart.js";
import FileUploader from "./FileUploader";
import { useOutletContext } from "react-router-dom";

ChartJS.register(LineElement, BarElement, CategoryScale, LinearScale, PointElement);

const MAX_DATA_POINTS = 50;

const Dashboard = () => {
	const data = useOutletContext();
	const [chartData, setChartData] = useState({
		labels: [],
		temperature: [],
	});

	useEffect(() => {
		if (data?.length) {
			setChartData((prev) => {
				const newLabels = [...prev.labels, ...data.map((item) => item.time)];
				const newTemperatures = [...prev.temperature, ...data.map((item) => item.temperature_2m)];

				const combinedData = newLabels.map((label, index) => ({
					label,
					temperature: newTemperatures[index],
				}));

				const limitedData = combinedData.slice(-MAX_DATA_POINTS);
				return {
					labels: limitedData.map((item) => item.label),
					temperature: limitedData.map((item) => item.temperature),
				};
			});
		}
	}, [data]);

	const dataLineOption = {
		labels: chartData.labels,
		datasets: [
			{
				label: "Temperature",
				data: chartData.temperature,
				fill: false,
				backgroundColor: "rgba(75,192,192,0.4)",
				borderColor: "rgba(75,192,192,1)",
			},
		],
	};

	const dataBarOption = {
		labels: chartData.labels,
		datasets: [
			{
				label: "Temperature",
				data: chartData.temperature,
				backgroundColor: [
					"rgba(255, 99, 132, 0.2)", // red
					"rgba(54, 162, 235, 0.2)", // blue
					"rgba(255, 206, 86, 0.2)", // yellow
					"rgba(75, 192, 192, 0.2)", // green
					"rgba(153, 102, 255, 0.2)", // purple
					"rgba(255, 159, 64, 0.2)", // orange
				],
				borderColor: [
					"rgba(255, 99, 132, 1)",
					"rgba(54, 162, 235, 1)",
					"rgba(255, 206, 86, 1)",
					"rgba(75, 192, 192, 1)",
					"rgba(153, 102, 255, 1)",
					"rgba(255, 159, 64, 1)",
				],
				borderWidth: 1,
			},
		],
	};

	return (
		<div className="grow p-8">
			<h2 className="text-2xl mb-4">Dashboard</h2>
			<div className="mb-6">
				<FileUploader />
			</div>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
				<div className="bg-white p-4 rounded-lg shadow-md">
					<h3 className="text-lg font-semibold mb-4">Temperature Data in Line Chart</h3>
					<Line data={dataLineOption} />
				</div>
				<div className="bg-white p-4 rounded-lg shadow-md">
					<h3 className="text-lg font-semibold mb-4">Temperature Data in Bar Chart</h3>
					<Bar data={dataBarOption} />
				</div>
			</div>
		</div>
	);
};

export default Dashboard;

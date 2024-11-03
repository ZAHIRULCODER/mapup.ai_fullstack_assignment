import { io } from "socket.io-client";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import DashboardLayout from "./components/DashboardLayout";
import { Toaster } from "react-hot-toast";
import Dashboard from "./components/Dashboard";
import DataTable from "./components/DataTable";


export const socket = io("https://mapupbe.onrender.com");

function App() {
	const isAuthenticated = () => {
		return !!localStorage.getItem("token");
	};

	const PrivateRoute = () => {
		return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
	};

	const PublicRoute = () => {
		return !isAuthenticated() ? <Outlet /> : <Navigate to="/dashboard" />;
	};

	return (
		<div>
			<Routes>
				<Route element={<PublicRoute />}>
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/" element={<Navigate to="/login" />} />
				</Route>
				{/* Protected Routes using PrivateRoute */}
				<Route element={<PrivateRoute />}>
					<Route element={<DashboardLayout />}>
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/data-table" element={<DataTable />} />
					</Route>
				</Route>
			</Routes>
			<Toaster />
		</div>
	);
}

export default App;

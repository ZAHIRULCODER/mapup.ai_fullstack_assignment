import React from "react";
import { FaTachometerAlt, FaBox } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
	const navigate = useNavigate();
	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("name");
		localStorage.removeItem("email");
		localStorage.removeItem("_id");
		navigate("/login");
	};

	return (
		<div className="bg-black h-screen px-4 fixed w-16 md:w-64 border-r border-gray-300 ">
			<h1 className="text-2xl font-bold hidden md:block mt-4 text-center italic text-white/70">REAL_DASH</h1>
			<ul className="flex flex-col mt-8 text-xl gap-5">
				<Link to="/dashboard">
					<li
						className="flex items-center py-3 px-4 space-x-4 hover:rounded-lg hover:cursor-pointer 
        hover:bg-indigo-600 text-white "
					>
						<FaTachometerAlt />
						<span className="hidden md:inline">Dashboard</span>
					</li>
				</Link>
				<Link to="/data-table">
					<li
						className="flex items-center py-3 px-4 space-x-4 hover:rounded-lg hover:cursor-pointer 
        text-white hover:bg-indigo-600"
					>
						<FaBox />
						<span className="hidden md:inline">Data table</span>
					</li>
				</Link>
				<li
					onClick={handleLogout}
					className="flex items-center py-3 px-4 space-x-4 hover:rounded-lg hover:cursor-pointer 
        text-red-600 hover:bg-indigo-600 hover:text-white"
				>
					<IoIosLogOut />
					<span className="hidden md:inline">Logout</span>
				</li>
			</ul>
		</div>
	);
};

export default Sidebar;

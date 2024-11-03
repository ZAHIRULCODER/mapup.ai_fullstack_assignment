import React, { useEffect, useState } from "react";

const Navbar = () => {
	const [loggedInUser, setLoggedInUser] = useState("");

	useEffect(() => {
		setLoggedInUser(localStorage.getItem("name"));
	}, []);

	return (
		<div className="bg-gray-100 text-gray-900 border-b border-gray-300 p-4 flex justify-between items-center font-semibold text-xl">
			<h1>Hi, {loggedInUser}</h1>
		</div>
	);
};

export default Navbar;

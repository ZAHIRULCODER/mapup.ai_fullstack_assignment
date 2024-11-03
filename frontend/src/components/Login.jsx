import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginURL } from "../constants";
import toast from "react-hot-toast";

const Login = () => {
	const navigate = useNavigate();
	const [error, setError] = useState(null);

	const handleLogin = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const email = formData.get("email");
		const password = formData.get("password");
		try {
			const response = await fetch(LoginURL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			});
			const result = await response.json();
			// console.log(result);
			setError(result.errors);
			if (result.success) {
				localStorage.setItem("token", result.jwtToken);
				localStorage.setItem("_id", result._id);
				localStorage.setItem("name", result.name);
				localStorage.setItem("email", result.email);
				navigate("/dashboard");
				toast.success(result.message);
			} else {
				if (result.status !== 422) {
					toast.error(result.message);
				}
			}
		} catch (error) {
			console.error(error);
			toast.error("Something went wrong!");
		}
	};

	return (
		<div className="flex min-h-full h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<img
					alt="Your Company"
					src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
					className="mx-auto h-10 w-auto"
				/>
				<h2 className="mt-8 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
					Login in to your account
				</h2>
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				<form onSubmit={handleLogin} className="space-y-6">
					<div>
						<label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
							Email address
						</label>
						<div className="mt-2">
							<input
								required
								name="email"
								type="email"
								placeholder="Eg. zahirul@gmail.com"
								autoComplete="email"
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
							/>
							<span className="text-red-500 text-sm">{error?.email}</span>
						</div>
					</div>

					<div>
						<label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
							Password
						</label>

						<div className="mt-2">
							<input
								required
								name="password"
								type="password"
								placeholder="Enter your password"
								autoComplete="current-password"
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
							/>
							<span className="text-red-500 text-sm">{error?.password}</span>
						</div>
					</div>

					<div>
						<button
							type="submit"
							className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							Login
						</button>
					</div>
				</form>

				<p className="mt-10 text-center text-sm/6 text-gray-500">
					Dont have an Account?{" "}
					<Link to={"/signup"} className="font-semibold text-indigo-600 hover:text-indigo-500">
						Signup
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Login;

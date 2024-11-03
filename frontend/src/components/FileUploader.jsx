import React, { useState } from "react";
import { UploadFileURL } from "../constants";
import toast from "react-hot-toast";

const FileUploader = () => {
	const [error, setError] = useState(null);

	const handleFileUpload = async (e) => {
		const file = e.target?.files[0];
		if (!file) return;

		const formData = new FormData();
		formData.append("userId", localStorage.getItem("_id"));
		formData.append("file", file);

		try {
			const response = await fetch(UploadFileURL, {
				headers: {
					Authorization: localStorage.getItem("token"),
				},
				method: "POST",
				body: formData,
			});
			const result = await response.json();
			console.log(result);
			setError(result.errors);
			if (result.success) {
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
		<div className="w-full max-w-md">
			<input
				type="file"
				placeholder="Upload CSV file only"
				onChange={handleFileUpload}
				className="file-input w-full max-w-md"
				accept=".csv"
			/>
			<span className="text-red-500">{error?.file}</span>
		</div>
	);
};

export default FileUploader;

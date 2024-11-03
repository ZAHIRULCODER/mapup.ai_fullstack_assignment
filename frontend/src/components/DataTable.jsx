import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { formatDate } from "@/lib/utils";

 const columns = [
		{
			header: "#",
			cell: ({ row }) => <div>{row.index + 1}</div>,
		},
		{
			accessorKey: "time",
			header: "Time",
			cell: ({ row }) => <div className="capitalize">{formatDate(row.getValue("time"))}</div>,
		},
		{
			accessorKey: "temperature_2m",
			header: "Temperature",
			cell: ({ row }) => <div className="capitalize">{row.getValue("temperature_2m")}°C</div>,
		},
 ];

export default function DataTable() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [nextCursor, setNextCursor] = useState(null);
	const [hasMore, setHasMore] = useState(true);

	const fetchData = async (cursor = null) => {
		setLoading(true);
		try {
			const response = await fetch(
				`http://localhost:3000/api/v1/data?limit=10${cursor ? `&cursor=${cursor}` : ""}`,
				{
					headers: {
						Authorization: localStorage.getItem("token"),
					},
				}
			);
			const result = await response.json();
			// console.log(result);
			setData((prevData) => [...prevData, ...result.data]);
			setNextCursor(result.pagination.nextCursor);
			setHasMore(result.pagination.hasNextPage);
		} catch (error) {
			console.error("Failed to fetch data", error);
		} finally {
			setLoading(false);
		}
	};


	useEffect(() => {
		fetchData();
	}, []);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		state: {
			pagination: { pageIndex: 0, pageSize: 10 },
		},
	});

	return (
		<div className="w-full grow p-8">
			<h2 className="text-2xl mb-4">Weather Data</h2>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(header.column.columnDef.header, header.getContext())}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{data.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow key={row.id}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length} className="h-24 text-center">
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-end space-x-2 py-4">
				<div className="space-x-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => fetchData(nextCursor)}
						disabled={!hasMore || loading}
					>
						{loading ? "Loading..." : "Load More"}
					</Button>
				</div>
			</div>
		</div>
	);
}

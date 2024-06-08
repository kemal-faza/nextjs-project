"use client";
import {
	deleteAllStudents,
	deleteAllTeachers,
	importTeachersData,
} from "@/app/lib/action";
import { deleteAllData } from "@/app/lib/db";
import { Import, Trash } from "lucide-react";

export default function DeleteAllDataButton({
	collectionName,
}: {
	collectionName: string;
}) {
	return (
		<button
			onClick={async () => {
				if (collectionName == "teachers") await deleteAllTeachers();
				if (collectionName == "students") await deleteAllStudents();
			}}
			className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 flex">
			<Trash className="w-5 h-5 mr-2" />
			Hapus Semua Data
		</button>
	);
}

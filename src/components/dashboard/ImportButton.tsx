"use client";
import { importStudentsData, importTeachersData } from "@/app/lib/action";
import { Import } from "lucide-react";

export default function ImportButton({
	collectionName,
}: {
	collectionName: string;
}) {
	return (
		<button
			onClick={async () => {
				if (collectionName == "teachers") await importTeachersData();
				if (collectionName == "students") await importStudentsData();
			}}
			className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 flex">
			<Import className="w-5 h-5 mr-2" />
			Import
		</button>
	);
}

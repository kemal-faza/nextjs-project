import TeacherAddForms from "@/components/dashboard/teachers/AddForms";
import { ChevronLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Add | Teacher",
};

export default function AddTeacherPage() {
	return (
		<>
			<div className="flex justify-between mb-5">
				<h1 className="text-3xl font-bold">Tambah Data Guru</h1>
				<Link
					href="/dashboard/teachers"
					className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex">
					<ChevronLeft className="w-5 h-5 mr-2" />
					Kembali
				</Link>
			</div>
			<TeacherAddForms />
		</>
	);
}

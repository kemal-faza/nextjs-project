import { getTeacher } from "@/app/lib/action";
import TeacherEditForms from "@/components/dashboard/teachers/EditForm";
import { ChevronLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Edit | Teacher",
};

export default async function EditTeacherPage({
	params: { id },
}: {
	params: { id: string };
}) {
	const teacher = await getTeacher(id);
	return (
		<>
			<div className="flex justify-between mb-5">
				<h1 className="text-3xl font-bold">Ubah Data Guru</h1>
				<Link
					href="/dashboard/teachers"
					className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex">
					<ChevronLeft className="w-5 h-5 mr-2" />
					Kembali
				</Link>
			</div>
			<TeacherEditForms teacher={teacher} />
		</>
	);
}

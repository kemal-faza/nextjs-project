import { getAllData } from "@/app/lib/db";
import DeleteTeacherButton from "@/components/dashboard/teachers/DeleteButton";
import { Pen, Pencil, PencilIcon, Plus, Trash, Trash2 } from "lucide-react";
import Link from "next/link";

export const metadata = {
	title: "Teachers",
};

export type TeacherType = {
	id: string;
	nama?: string;
	mapel?: string;
	jabatan?: string;
};

export default async function TeachersPage() {
	const teachers = await getAllData("teachers");
	return (
		<>
			<div className="flex justify-between mb-5">
				<h1 className="text-3xl font-bold">Teachers Data</h1>
				<Link
					href="/dashboard/teachers/add"
					className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex">
					<Plus className="w-5 h-5 mr-2" />
					Tambah
				</Link>
			</div>

			<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
				<table className="w-full text-sm text-left rtl:text-right text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th
								scope="col"
								className="px-6 py-3">
								Nama
							</th>
							<th
								scope="col"
								className="px-6 py-3">
								Jabatan
							</th>
							<th
								scope="col"
								className="px-6 py-3">
								Mapel Ajar
							</th>
							<th
								scope="col"
								className="px-6 py-3">
								Aksi
							</th>
						</tr>
					</thead>
					<tbody>
						{teachers.map((teacher: TeacherType) => (
							<tr
								key={teacher.id}
								className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
								<th
									scope="row"
									className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
									{teacher.nama}
								</th>
								<td className="px-6 py-4">{teacher.jabatan}</td>
								<td className="px-6 py-4">{teacher.mapel}</td>
								<td className="px-6 py-4 flex">
									<Link
										href={`/dashboard/teachers/${teacher.id}`}
										className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900 flex w-fit">
										<PencilIcon className="w-5 h-5 mr-2" />
										Ubah
									</Link>
									<DeleteTeacherButton id={teacher.id} />
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
}

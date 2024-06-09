import {
	getAllTeachers,
	importTeachersData,
	searchTeacher,
} from "@/app/lib/action";
import { TeacherType } from "@/app/lib/data";
import DeleteTeacherButton from "@/components/dashboard/teachers/DeleteButton";
import ImportButton from "@/components/dashboard/ImportButton";
import { PencilIcon, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import DeleteAllDataButton from "@/components/dashboard/DeleteAllDataButton";
import { getAllData } from "@/app/lib/db";
import SearchBar from "@/components/dashboard/SearchBar";
import SearchBarSkeleton from "@/components/dashboard/skeletons/SearchBar";
import { Suspense } from "react";

export const metadata = {
	title: "Teachers",
};

export default async function TeachersPage({
	searchParams,
}: {
	searchParams: { search: string; page: string };
}) {
	const teachers = (await searchTeacher(searchParams.search || "")).sort(
		(a, b) => {
			return Number(b.date) - Number(a.date);
		},
	);

	return (
		<>
			<div className="flex justify-between mb-5">
				<h1 className="text-3xl font-bold">Teachers Data</h1>
				<div className="flex">
					{/* <DeleteAllDataButton collectionName={"teachers"} /> */}
					<ImportButton collectionName="teachers" />
					<Link
						href="/dashboard/teachers/add"
						className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex">
						<Plus className="w-5 h-5 mr-2" />
						Tambah
					</Link>
				</div>
			</div>

			<Suspense fallback={<SearchBarSkeleton />}>
				<div className="flex justify-between items-center mb-4">
					<SearchBar />
					<p>Total : {teachers.length} Data</p>
				</div>
			</Suspense>

			<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
				<table className="w-full text-sm text-center rtl:text-right text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th
								scope="col"
								className="px-6 py-3">
								No
							</th>
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
								Foto
							</th>
							<th
								scope="col"
								className="px-6 py-3">
								Aksi
							</th>
						</tr>
					</thead>
					<tbody>
						{teachers.length > 0 ? (
							teachers.map(
								(teacher: TeacherType, index: number) => (
									<tr
										key={teacher.id}
										className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 align-middle">
										<td className="px-6 py-4">
											{index + 1}
										</td>
										<th
											scope="row"
											className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
											{teacher.nama}
										</th>
										<td className="px-6 py-4">
											{teacher.jabatan}
										</td>
										<td className="px-6 py-4">
											{teacher.mapel}
										</td>
										<td className="px-6 py-4">
											<Image
												width={100}
												height={100}
												src={
													teacher.image
														? `/img/teachers/${teacher.image}`
														: "/img/default.jpg"
												}
												alt=""
												className="mx-auto"
											/>
										</td>
										<td className="px-6 py-4">
											<div className="flex justify-evenly">
												<Link
													href={`/dashboard/teachers/${teacher.id}`}
													className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 my-3 me-3 dark:focus:ring-yellow-900 flex w-fit">
													<PencilIcon className="w-5 h-5 mr-2" />
													Ubah
												</Link>
												<DeleteTeacherButton
													id={teacher.id}
												/>
											</div>
										</td>
									</tr>
								),
							)
						) : (
							<tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
								<td colSpan={5}>
									<div
										className="flex items-center p-4 m-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
										role="alert">
										<svg
											className="flex-shrink-0 inline w-4 h-4 me-3"
											aria-hidden="true"
											xmlns="http://www.w3.org/2000/svg"
											fill="currentColor"
											viewBox="0 0 20 20">
											<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
										</svg>
										<span className="sr-only">Info</span>
										<div>
											<span className="font-medium">
												Data kosong!
											</span>{" "}
											Silahkan tambahkan data terlebih
											dahulu
										</div>
									</div>
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</>
	);
}

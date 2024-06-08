import { getAllStudents, searchStudent } from "@/app/lib/action";
import { StudentType } from "@/app/lib/data";
import DeleteAllDataButton from "@/components/dashboard/DeleteAllDataButton";
import { DeleteStudentButton } from "@/components/dashboard/students/DeleteButton";
import ImportButton from "@/components/dashboard/ImportButton";
import { PencilIcon, Plus } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "@/components/dashboard/SearchBar";
import { getPaginateData, getTotalPage } from "@/app/lib/db";
import Pagination from "@/components/dashboard/Pagination";

export const metadata: Metadata = {
	title: "Students",
};

export default async function StudentsPage({
	searchParams,
}: {
	searchParams: { search: string; page: string };
}) {
	const totalPage = await getTotalPage("students");
	const students = await getPaginateData("students");
	// const students = (await searchStudent(searchParams.search || "")).sort(
	// 	(a, b) => {
	// 		// return searchParams.search && searchParams.search != ""
	// 		// 	? (a.kelas > b.kelas) - (a.kelas < b.kelas)
	// 		// 	: Number(b.date) - Number(a.date);
	// 		return Number(b.date) - Number(a.date);
	// 	},
	// );

	return (
		<>
			<div className="flex justify-between mb-5">
				<h1 className="text-3xl font-bold">Students Data</h1>
				<div className="flex">
					{/* <DeleteAllDataButton collectionName={"students"} /> */}
					<ImportButton collectionName="students" />
					<Link
						href="/dashboard/students/add"
						className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex">
						<Plus className="w-5 h-5 mr-2" />
						Tambah
					</Link>
				</div>
			</div>

			<div className="flex justify-between items-center mb-4">
				<SearchBar />
				<p>Total : {students.length} Data</p>
			</div>

			<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
				<table className="w-full text-sm rtl:text-right text-gray-400 text-center">
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
								Kelas
							</th>
							<th
								scope="col"
								className="px-6 py-3">
								Tanggal Lahir
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
						{students.length > 0 ? (
							students.map(
								(student: StudentType, index: number) => {
									const tanggalLahir =
										student.tanggalLahir != ""
											? new Date(
													student.tanggalLahir as string,
											  )
											: student.tanggalLahir;

									return (
										<tr
											key={student.id}
											className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
											<td className="px-6 py-4">
												{index + 1}
											</td>
											<th
												scope="row"
												className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
												{student.nama}
											</th>
											<td className="px-6 py-4">
												{student.kelas}
											</td>
											<td className="px-6 py-4">
												{tanggalLahir != "" &&
													tanggalLahir.toLocaleDateString(
														"id-ID",
														{
															day: "numeric",
															month: "long",
															year: "numeric",
														},
													)}
											</td>
											<td className="px-6 py-4">
												<Image
													width={100}
													height={100}
													src={
														student.image
															? `/img/students/${student.image}`
															: "/img/default.jpg"
													}
													alt=""
													className="mx-auto"
												/>
											</td>
											<td className="px-6 py-4">
												<div className="flex justify-evenly">
													<Link
														href={`/dashboard/students/${student.id}`}
														className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 my-3 me-3 dark:focus:ring-yellow-900 flex w-fit">
														<PencilIcon className="w-5 h-5 mr-2" />
														Ubah
													</Link>
													<DeleteStudentButton
														id={student.id}
													/>
												</div>
											</td>
										</tr>
									);
								},
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

			<div className="flex justify-center mt-5">
				<Pagination />
			</div>
		</>
	);
}

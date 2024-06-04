"use client";

import { useState } from "react";
import { jabatan, mataPelajaran } from "@/app/lib/data";
import { addTeacher, editTeacher } from "@/app/lib/action";
import { TeacherType } from "@/app/dashboard/teachers/page";

export default function TeacherEditForms({
	teacher,
}: {
	teacher: TeacherType;
}) {
	const [mapelAjar, setMapelAjar] = useState(
		teacher.mapel?.split(", ") || [""],
	);

	function handleMapelChange(value: string) {
		if (mapelAjar.includes(value)) {
			const index = mapelAjar.indexOf(value);
			const newMapel = mapelAjar.toSpliced(index, 1);
			setMapelAjar([...newMapel]);
		} else {
			setMapelAjar([...mapelAjar, value]);
		}
	}

	const editTeacherWithId = editTeacher.bind(null, teacher.id);

	return (
		<form
			action={editTeacherWithId}
			className="max-w-xl">
			<div className="relative z-0 w-full mb-5 group">
				<input
					type="hidden"
					defaultValue={teacher.mapel}
					value={mapelAjar.slice(1).join(", ")}
					name="mapel"
					id="mapel"
				/>
				<input
					type="text"
					name="nama"
					id="nama"
					defaultValue={teacher.nama}
					className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
					placeholder=""
					required
				/>
				<label
					htmlFor="nama"
					className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
					Nama
				</label>
			</div>

			<div className="relative z-0 w-full mb-5 group">
				<label
					htmlFor="nama"
					className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
					Jabatan
				</label>
				<select
					id="nama"
					name="jabatan"
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
					{jabatan.map((jabatan) => (
						<option
							key={jabatan}
							value={jabatan}
							{...(teacher.jabatan === jabatan && {
								selected: true,
							})}>
							{jabatan}
						</option>
					))}
				</select>
			</div>

			<div className="relative z-0 w-full mb-5 group">
				<h4 className="text-sm font-medium mb-3">Mapel Ajar</h4>
				{mataPelajaran.map((mapel) => (
					<div
						key={mapel}
						className="flex items-center mb-4">
						<input
							id={mapel}
							type="checkbox"
							value={mapel}
							checked={mapelAjar
								.map((mapel) => mapel)
								.includes(mapel)}
							onChange={(e) => {
								handleMapelChange(e.target.value);
							}}
							className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
						/>
						<label
							htmlFor="checkbox-2"
							className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
							{mapel}
						</label>
					</div>
				))}
			</div>

			<button
				type="submit"
				className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
				Ubah
			</button>
		</form>
	);
}

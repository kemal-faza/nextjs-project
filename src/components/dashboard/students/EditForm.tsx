"use client";

import { useState } from "react";
import { StudentType, kelas } from "@/app/lib/data";
import { editStudent } from "@/app/lib/action";
import Image from "next/image";
import DatePicker from "tailwind-datepicker-react";

export default function StudentEditForm({ student }: { student: StudentType }) {
	const [image, setImage] = useState("");
	const [createObjectURL, setCreateObjectURL] = useState("");
	const [show, setShow] = useState(false);
	const tanggalLahir =
		student.tanggalLahir != ""
			? new Date(student.tanggalLahir as string)
			: null;

	function handleImageChange(e: any) {
		const file = e.target.files[0];
		const urlImage = URL.createObjectURL(file);

		setImage(image);
		setCreateObjectURL(urlImage);
	}

	function handleCloseDatepicker(state: boolean) {
		setShow(state);
	}

	const datepickerOptions: any = {
		// title: "Demo Title",
		autoHide: true,
		todayBtn: false,
		clearBtn: true,
		clearBtnText: "Clear",
		maxDate: new Date("2030-01-01"),
		minDate: new Date("1950-01-01"),
		theme: {
			background: "",
			todayBtn: "",
			clearBtn: "",
			icons: "",
			text: "",
			disabledText: "",
			input: "pl-10",
			inputIcon: "mx-3 my-2.5",
			selected: "",
		},
		icons: {
			// () => ReactElement | JSX.Element
			// prev: () => <span>Previous</span>,
			// next: () => <span>Next</span>,
		},
		datepickerClassNames: "",
		defaultDate: tanggalLahir,
		language: "id",
		disabledDates: [],
		weekDays: ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"],
		inputNameProp: "tanggalLahir",
		inputIdProp: "tanggalLahir",
		inputPlaceholderProp: "Pilih Tanggal Lahir",
		inputDateFormatProp: {
			day: "numeric",
			month: "long",
			year: "numeric",
		},
	};

	const editStudentWithId = editStudent.bind(null, student.id);

	return (
		<form
			action={editStudentWithId}
			className="max-w-xl">
			<div className="relative z-0 w-full mb-5 group">
				<input
					type="text"
					name="nama"
					id="nama"
					placeholder=""
					defaultValue={student.nama}
					className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
				/>
				<label
					htmlFor="nama"
					className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
					Nama
				</label>
			</div>

			<div className="relative z-0 w-full mb-5 group">
				<label
					htmlFor="kelas"
					className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
					Kelas
				</label>
				<select
					id="kelas"
					name="kelas"
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
					{kelas.map((item) => (
						<option
							key={item}
							value={item}
							{...(student.kelas === item && {
								selected: true,
							})}>
							{item}
						</option>
					))}
				</select>
			</div>

			<div className="relative z-0 w-full mb-5 group">
				<label
					htmlFor="kesan"
					className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
					Kesan selama di MAN Kapuas
				</label>
				<textarea
					id="kesan"
					name="kesan"
					rows={4}
					placeholder="Kesan selama di MAN Kapuas..."
					className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
					{student.kesan}
				</textarea>
			</div>

			<div className="relative z-0 w-full mb-5 group">
				<label
					htmlFor="pesan"
					className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
					Pesan untuk semua orang
				</label>
				<textarea
					id="pesan"
					name="pesan"
					rows={4}
					placeholder="Pesan untuk semua orang..."
					className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
					{student.pesan}
				</textarea>
			</div>
			<div className="relative z-10 w-full mb-5 group">
				<DatePicker
					show={show}
					setShow={handleCloseDatepicker}
					options={datepickerOptions}
				/>
			</div>

			<div className="relative z-0 w-full mb-5 group">
				<label
					className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					htmlFor="image">
					Foto
				</label>
				<div className="flex items-center">
					<div>
						<Image
							src={createObjectURL || "/img/default.jpg"}
							alt=""
							width={200}
							height={200}
						/>
					</div>
					<div className="ml-3">
						<input
							className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
							aria-describedby="user_avatar_help"
							id="image"
							name="image"
							type="file"
							onChange={handleImageChange}
						/>
						<div
							className="mt-1 text-sm text-gray-500 dark:text-gray-300"
							id="user_avatar_help">
							kmk
						</div>
					</div>
				</div>
			</div>

			<button
				type="submit"
				className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
				Ubah
			</button>
		</form>
	);
}

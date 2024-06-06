"use client";
import { deleteStudent } from "@/app/lib/action";
import { Trash2 } from "lucide-react";
import Swal from "sweetalert2";

export async function DeleteStudentButton({ id }: { id: string }) {
	const deleteStudentWithId = deleteStudent.bind(null, id);
	function handleClick() {
		Swal.fire({
			title: "Hapus data?",
			text: "Data tidak bisa dikembalikan!",
			icon: "warning",
			showCancelButton: true,
			cancelButtonColor: "#3085d6",
			confirmButtonColor: "#d33",
			confirmButtonText: "Ya",
			cancelButtonText: "Tidak",
			focusCancel: true,
		}).then((result) => {
			if (result.isConfirmed) {
				deleteStudentWithId();
				Swal.fire({
					title: "Dihapus!",
					text: "Data telah dihapus.",
					icon: "success",
				});
			}
		});
	}

	return (
		<button
			onClick={handleClick}
			className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 my-3 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 flex w-fit">
			<Trash2 className="w-5 h-5 mr-2" />
			Hapus
		</button>
	);
}

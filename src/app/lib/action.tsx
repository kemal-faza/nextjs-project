"use server";
import { addData, deleteData, editData } from "./db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addTeacher(formData: FormData) {
	const data = Object.fromEntries(formData.entries());

	await addData("teachers", data);

	revalidatePath("/dashboard/teachers");
	redirect("/dashboard/teachers");
}

export async function deleteTeacher(id: string) {
	await deleteData("teachers", id);

	revalidatePath("/dashboard/teachers");
}

export async function editTeacher(id: string, formData: FormData) {
	const data = Object.fromEntries(formData.entries());

	await editData("teachers", data, id);

	revalidatePath("/dashboard/teachers");
	redirect("/dashboard/teachers");
}

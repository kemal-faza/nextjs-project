"use server";
import { addData, deleteData, editData, getData } from "./db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import fs from "fs/promises";
import { hash, randomUUID } from "crypto";

export async function addTeacher(formData: FormData) {
	const file = formData.get("image") as File;
	const extension = file.name.split(".").at(-1);

	const data = {
		nama: formData.get("nama"),
		mapel: formData.get("mapel"),
		jabatan: formData.get("jabatan"),
		image: randomUUID() + "." + extension,
		date: Date.now().toString(),
	};

	const buffer = await file.arrayBuffer();
	const imageBuffer = Buffer.from(buffer);

	await fs.writeFile(`public/img/teachers/${data.image}`, imageBuffer);

	await addData("teachers", data);

	revalidatePath("/dashboard/teachers");
	redirect("/dashboard/teachers");
}

export async function deleteTeacher(id: string) {
	const teacher = await getData("teachers", id);

	fs.rm(`/img/teachers/${teacher.image}.png`, { force: true });
	await deleteData("teachers", id);

	revalidatePath("/dashboard/teachers");
}

export async function editTeacher(id: string, formData: FormData) {
	const data = Object.fromEntries(formData.entries());

	await editData("teachers", data, id);

	revalidatePath("/dashboard/teachers");
	redirect("/dashboard/teachers");
}

"use server";
import { addData, deleteData, editData, getAllData, getData } from "./db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import fs from "fs/promises";
import { hash, randomUUID } from "crypto";
import { StudentType, TeacherType, bulan } from "./data";

export async function getAllTeachers() {
	const teachers: TeacherType[] = await getAllData("teachers");
	return teachers;
}

export async function getAllStudents() {
	const students: StudentType[] = await getAllData("students");
	return students;
}

export async function getTeacher(id: string) {
	const teacher: TeacherType = await getData("teachers", id);
	return teacher;
}

export async function getStudent(id: string) {
	const student: StudentType = await getData("students", id);
	return student;
}

export async function addTeacher(formData: FormData) {
	const file = formData.get("image") as File;

	const data = {
		nama: formData.get("nama"),
		mapel: formData.get("mapel"),
		jabatan: formData.get("jabatan"),
		image: "",
		date: Date.now().toString(),
	};

	if (file.name != "undefined") {
		const extension = file.name.split(".").at(-1);
		data.image = randomUUID() + "." + extension;

		const buffer = await file.arrayBuffer();
		const imageBuffer = Buffer.from(buffer);

		await fs.writeFile(`public/img/teachers/${data.image}`, imageBuffer);
	}

	await addData("teachers", data);

	revalidatePath("/dashboard/teachers");
	redirect("/dashboard/teachers");
}

export async function deleteTeacher(id: string) {
	const teacher = await getData("teachers", id);

	fs.rm(`public/img/teachers/${teacher.image}.png`, { force: true });
	await deleteData("teachers", id);

	revalidatePath("/dashboard/teachers");
}

export async function editTeacher(id: string, formData: FormData) {
	const file = formData.get("image") as File;
	const teacher = await getData("teachers", id);

	const data = {
		nama: formData.get("nama"),
		mapel: formData.get("mapel"),
		jabatan: formData.get("jabatan"),
		image: teacher.image,
	};

	if (file.name != "undefined") {
		const extension = file.name.split(".").at(-1);
		data.image = randomUUID() + "." + extension;

		const buffer = await file.arrayBuffer();
		const imageBuffer = Buffer.from(buffer);

		await fs.rm(`public/img/teachers/${teacher.image}`, { force: true });
		await fs.writeFile(`public/img/teachers/${data.image}`, imageBuffer);
	}

	await editData("teachers", data, id);

	revalidatePath("/dashboard/teachers");
	redirect("/dashboard/teachers");
}

export async function addStudent(formData: FormData) {
	const file = formData.get("image") as File;
	const [date, month, year] =
		formData.get("tanggalLahir")?.toString().split(" ") || [];
	const newDate = `${year}-${bulan[month]}-${date}`;

	const data = {
		nama: formData.get("nama"),
		kelas: formData.get("kelas"),
		tanggalLahir: new Date(newDate).toUTCString(),
		kesan: formData.get("kesan"),
		pesan: formData.get("pesan"),
		image: "",
		date: Date.now().toString(),
	};

	if (file.name != "undefined") {
		const extension = file.name.split(".").at(-1);
		data.image = randomUUID() + "." + extension;

		const buffer = await file.arrayBuffer();
		const imageBuffer = Buffer.from(buffer);

		await fs.writeFile(`public/img/students/${data.image}`, imageBuffer);
	}

	await addData("students", data);

	revalidatePath("/dashboard/students");
	redirect("/dashboard/students");
}

export async function deleteStudent(id: string) {
	const teacher = await getData("students", id);

	fs.rm(`public/img/students/${teacher.image}.png`, { force: true });
	await deleteData("students", id);

	revalidatePath("/dashboard/students");
}

export async function editStudent(id: string, formData: FormData) {
	const file = formData.get("image") as File;
	const student = await getData("students", id);
	const [date, month, year] =
		formData.get("tanggalLahir")?.toString().split(" ") || [];
	const newDate = `${year}-${bulan[month]}-${date}`;

	const data = {
		nama: formData.get("nama"),
		kelas: formData.get("kelas"),
		tanggalLahir: new Date(newDate).toUTCString(),
		kesan: formData.get("kesan"),
		pesan: formData.get("pesan"),
		image: student.image,
	};

	if (file.name != "undefined") {
		const extension = file.name.split(".").at(-1);
		data.image = randomUUID() + "." + extension;

		const buffer = await file.arrayBuffer();
		const imageBuffer = Buffer.from(buffer);

		if (student.image != "")
			await fs.rm(`public/img/students/${student.image}`, {
				force: true,
			});
		await fs.writeFile(`public/img/students/${data.image}`, imageBuffer);
	}

	await editData("students", data, id);

	revalidatePath("/dashboard/students");
	redirect("/dashboard/students");
}

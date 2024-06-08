"use server";
import {
	addData,
	deleteAllData,
	deleteData,
	editData,
	getAllData,
	getData,
	importData,
} from "./db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import fs from "fs/promises";
import { hash, randomUUID } from "crypto";
import {
	OldStudentType,
	OldTeacherType,
	StudentType,
	TeacherType,
	bulan,
} from "./data";
import { writeBatch } from "firebase/firestore";

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

export async function searchStudent(keywords: string) {
	const students: StudentType[] = await getAllData("students");
	return students.filter((student) => {
		return student.nama?.toLowerCase().includes(keywords.toLowerCase());
	});
}

export async function searchTeacher(keywords: string) {
	const teachers: TeacherType[] = await getAllData("teachers");
	return teachers.filter((teacher) => {
		return teacher.nama?.toLowerCase().includes(keywords.toLowerCase());
	});
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

		await fs.writeFile(
			`${process.cwd()}/public/img/teachers/${data.image}`,
			imageBuffer,
		);
	}

	await addData("teachers", data);

	revalidatePath("/dashboard/teachers");
	redirect("/dashboard/teachers");
}

export async function deleteTeacher(id: string) {
	const teacher = await getData("teachers", id);

	if (teacher.image != "")
		await fs.rm(`${process.cwd()}/public/img/teachers/${teacher.image}`, {
			force: true,
		});
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

		await fs.rm(`${process.cwd()}/public/img/teachers/${teacher.image}`, {
			force: true,
		});
		await fs.writeFile(
			`${process.cwd()}/public/img/teachers/${data.image}`,
			imageBuffer,
		);
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
		tanggalLahir: formData.get("tanggalLahir")
			? new Date(newDate).toUTCString()
			: "",
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

		await fs.writeFile(
			`${process.cwd()}/public/img/students/${data.image}`,
			imageBuffer,
		);
	}

	await addData("students", data);

	revalidatePath("/dashboard/students");
	redirect("/dashboard/students");
}

export async function deleteStudent(id: string) {
	const student: StudentType = await getData("students", id);

	if (student.image)
		fs.rm(`${process.cwd()}/public/img/students/${student.image}.png`, {
			force: true,
		});
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
			await fs.rm(
				`${process.cwd()}/public/img/students/${student.image}`,
				{
					force: true,
				},
			);
		await fs.writeFile(
			`${process.cwd()}/public/img/students/${data.image}`,
			imageBuffer,
		);
	}

	await editData("students", data, id);

	revalidatePath("/dashboard/students");
	redirect("/dashboard/students");
}

export async function importTeachersData() {
	let teachers = JSON.parse(
		await fs.readFile(
			"C:/Users/user/Documents/aksana-29/public/data/guru.json",
			{
				encoding: "utf-8",
			},
		),
	) as OldTeacherType[];

	const batchTeacher: TeacherType[] = [];
	teachers.forEach(async (teacher: OldTeacherType) => {
		let data = {
			id: randomUUID(),
			nama: teacher.nama,
			mapel: "",
			jabatan: teacher.jabatan,
			image: "",
			date: Date.now().toString(),
		};

		if (teacher.mapel) {
			if (typeof teacher.mapel == "string") {
				data.mapel = teacher.mapel;
			} else {
				data.mapel = teacher.mapel.join(", ");
			}
		}

		const extension = teacher.image?.split(".").at(-1);
		data.image = randomUUID() + "." + extension;

		fs.copyFile(
			`C:/Users/user/Documents/aksana-29/public/img/guru/${teacher.image}`,
			`C:/Users/user/Documents/nextjs-project/public/img/teachers/${data.image}`,
		);

		batchTeacher.push(data);
	});

	await importData("teachers", batchTeacher);

	revalidatePath("/dashboard/teachers");
}

export async function deleteAllTeachers() {
	const teachers = await getAllTeachers();
	teachers.forEach(async (item) => {
		if (item.image != "")
			fs.rm(`${process.cwd()}/public/img/teachers/${item.image}`, {
				force: true,
			});
	});
	await deleteAllData("teachers");
	revalidatePath("/dashboard/teachers");
}

export async function importStudentsData() {
	let students = JSON.parse(
		await fs.readFile(
			"C:/Users/user/Documents/aksana-29/public/data/siswa.json",
			{
				encoding: "utf-8",
			},
		),
	) as OldStudentType[];

	const batchStudents: StudentType[] = [];
	students.forEach(async (student: OldStudentType) => {
		const [date, month, year] = student.ttl?.toString().split("-") || [];
		const newDate = `${year}-${month}-${date}`;

		let data = {
			id: randomUUID(),
			nama: student.nama,
			kelas: student.kelas,
			image: "",
			tanggalLahir: new Date(newDate).toUTCString(),
			kesan: student.kesan,
			pesan: student.pesan,
			date: Date.now().toString(),
		};

		const extension = student.image?.split(".").at(-1);
		data.image = randomUUID() + "." + extension;

		fs.copyFile(
			`C:/Users/user/Documents/aksana-29/public/img/pesdik/${student.image}`,
			`C:/Users/user/Documents/nextjs-project/public/img/students/${data.image}`,
		);

		batchStudents.push(data);
	});

	await importData("students", batchStudents);

	revalidatePath("/dashboard/students");
}

export async function deleteAllStudents() {
	const students = await getAllStudents();
	students.forEach(async (item) => {
		if (item.image != "")
			fs.rm(`${process.cwd()}/public/img/students/${item.image}`, {
				force: true,
			});
	});
	await deleteAllData("students");
	revalidatePath("/dashboard/students");
}

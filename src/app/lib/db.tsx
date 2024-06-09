import {
	addDoc,
	deleteDoc,
	doc,
	getDoc,
	getFirestore,
	limit,
	orderBy,
	query,
	setDoc,
	where,
	writeBatch,
} from "firebase/firestore";
import app from "./firebase";
import { collection, getDocs } from "firebase/firestore";

const db = getFirestore(app);

export async function getAllData(collectionName: "students" | "teachers") {
	const querySnapshot = await getDocs(collection(db, collectionName));
	const data: any[] = querySnapshot.docs.map((doc) => {
		return {
			id: doc.id,
			...doc.data(),
		};
	});
	return data;
}

export async function getData(
	collectionName: "students" | "teachers",
	id: string,
) {
	const docSnap = await getDoc(doc(db, collectionName, id));
	const data: any = {
		id: docSnap.id,
		...docSnap.data(),
	};
	return data;
}

export async function addData(
	collectionName: "students" | "teachers",
	data: any,
) {
	await addDoc(collection(db, collectionName), data);
}

export async function deleteData(
	collectionName: "students" | "teachers",
	id: string,
) {
	await deleteDoc(doc(db, collectionName, id));
}

export async function editData(
	collectionName: "students" | "teachers",
	data: any,
	id: string,
) {
	await setDoc(doc(db, collectionName, id), data);
}

export async function importData(
	collectionName: "students" | "teachers",
	data: any,
) {
	const batch = writeBatch(db);
	data.forEach((item: any) => {
		const addItem = doc(db, collectionName, item.id);
		batch.set(addItem, item);
	});
	await batch.commit();
}

export async function deleteAllData(collectionName: "students" | "teachers") {
	const batch = writeBatch(db);
	const querySnapshot = await getAllData(collectionName);
	querySnapshot.forEach((item) => {
		const data = doc(db, collectionName, item.id);
		batch.delete(data);
	});
	await batch.commit();
}

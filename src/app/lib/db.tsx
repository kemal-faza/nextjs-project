import {
	addDoc,
	deleteDoc,
	doc,
	getDoc,
	getFirestore,
	setDoc,
} from "firebase/firestore";
import app from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import { TeacherType } from "./data";

const db = getFirestore(app);

export async function getAllData(collectionName: string) {
	const querySnapshot = await getDocs(collection(db, collectionName));
	let data: TeacherType[] = querySnapshot.docs.map((doc) => {
		return {
			id: doc.id,
			...doc.data(),
		};
	});
	return data;
}

export async function getData(collectionName: string, id: string) {
	const docSnap = await getDoc(doc(db, collectionName, id));
	const data: TeacherType = {
		id: docSnap.id,
		...docSnap.data(),
	};
	return data;
}

export async function addData(collectionName: string, data: any) {
	await addDoc(collection(db, collectionName), data);
}

export async function deleteData(collectionName: string, id: string) {
	await deleteDoc(doc(db, collectionName, id));
}

export async function editData(collectionName: string, data: any, id: string) {
	await setDoc(doc(db, collectionName, id), data);
}

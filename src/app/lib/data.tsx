export const jabatan = [
	"Kepala Madrasah",
	"Kepala Tata Usaha",
	"Wakil Kepala Madrasah",
	"Staf Tata Usaha",
	"Wali Kelas",
	"Tokoh Agama",
	"Guru BP/BK",
	"Dewan Guru",
];

export const mataPelajaran = [
	"Bahasa Indonesia",
	"Akidah Akhlak",
	"Matematika",
	"Al-Qur'an Hadits",
	"Bahasa Inggris",
	"Fiqih",
	"Bahasa Arab",
	"Matematika Peminatan",
	"Sejarah Peminatan",
	"Bahasa Arab Peminatan",
	"Sejarah Kebudayaan Islam",
	"Biologi",
	"Sosiologi",
	"Ilmu Hadits",
	"Pendidikan Pancasila dan Kewarganegaraan",
	"Kimia",
	"Geografi",
	"Ushul Fiqih",
	"Fisika",
	"Ekonomi",
	"Ilmu Tafsir",
	"Sejarah Indonesia",
	"Prakarya dan Kewirausahaan",
	"Mulok",
	"Pendidikan Jasmani, Olahraga, Kesehatan",
	"Seni Budaya",
	"Keterampilan",
];

export const kelas = [
	"XII IPA 1",
	"XII IPA 2",
	"XII IPA 3",
	"XII IPA 4",
	"XII IPS 1",
	"XII IPS 2",
	"XII IPS 3",
	"XII PAI",
];

export type TeacherType = {
	id: string;
	nama?: string;
	mapel?: string;
	jabatan?: string;
	image?: string;
	date?: string;
};

export type StudentType = {
	id: string;
	nama?: string;
	kelas?: string;
	tanggalLahir?: string;
	kesan?: string;
	pesan?: string;
	image?: string;
	date?: string;
};

export const bulan: any = {
	Januari: "01",
	Februari: "02",
	Maret: "03",
	April: "04",
	Mei: "05",
	Juni: "06",
	Juli: "07",
	Agustus: "08",
	September: "09",
	Oktober: "10",
	November: "11",
	Desember: "12",
};

export type OldStudentType = {
	nama?: string;
	kelas?: string;
	ttl?: string;
	kesan?: string;
	pesan?: string;
	image?: string;
};
export type OldTeacherType = {
	nama?: string;
	jabatan?: string;
	mapel?: string[];
	ekstra?: string;
	image?: string;
};

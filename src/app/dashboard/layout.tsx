import { Inter } from "next/font/google";
// import "@/app/globals.css";
import Script from "next/script";
import Sidebar from "@/components/dashboard/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Sidebar>{children}</Sidebar>
				<Script src="/script/flowbite.min.js"></Script>
				<Script src="/script/datepicker.min.js"></Script>
			</body>
		</html>
	);
}

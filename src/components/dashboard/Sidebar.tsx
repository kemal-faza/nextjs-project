"use client";
import clsx from "clsx";
import { GraduationCap, LayoutDashboard, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();

	const pageLink = [
		{
			name: "Dashboard",
			link: "/dashboard",
			icon: LayoutDashboard,
		},
		{
			name: "Teachers",
			link: "/dashboard/teachers",
			icon: GraduationCap,
		},
		{
			name: "Students",
			link: "/dashboard/students",
			icon: Users,
		},
	];
	return (
		<>
			<button
				data-drawer-target="default-sidebar"
				data-drawer-toggle="default-sidebar"
				aria-controls="default-sidebar"
				type="button"
				className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
				<span className="sr-only">Open sidebar</span>
				<svg
					className="w-6 h-6"
					aria-hidden="true"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg">
					<path
						clipRule="evenodd"
						fillRule="evenodd"
						d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
				</svg>
			</button>

			<aside
				id="default-sidebar"
				className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
				aria-label="Sidebar">
				<div className="h-full px-3 py-4 overflow-y-auto bg-gray-100">
					<ul className="space-y-2 font-medium">
						{pageLink.map((link) => (
							<li key={link.name}>
								<Link
									href={link.link}
									className={clsx(
										"flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700",
										pathname === link.link
											? "bg-gray-200 dark:bg-gray-700"
											: "",
									)}>
									<link.icon color="#6b7280" />
									<span className="flex-1 ms-3 whitespace-nowrap">
										{link.name}
									</span>
								</Link>
							</li>
						))}
					</ul>
				</div>
			</aside>

			<div className="p-10 sm:ml-64">{children}</div>
		</>
	);
}

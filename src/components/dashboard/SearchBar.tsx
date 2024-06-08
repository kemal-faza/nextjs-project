"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function SearchBar() {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	const handleSearch = useDebouncedCallback((keywords: string) => {
		const params = new URLSearchParams(searchParams);
		keywords ? params.set("search", keywords) : params.delete("search");
		replace(`${pathname}?${params.toString()}`);
	}, 300);

	return (
		<div className="bg-white dark:bg-gray-900 my-auto">
			<label
				htmlFor="table-search"
				className="sr-only">
				Search
			</label>
			<div className="relative mt-1">
				<div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
					<svg
						className="w-4 h-4 text-gray-500 dark:text-gray-400"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 20 20">
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
						/>
					</svg>
				</div>
				<input
					type="text"
					id="search"
					autoFocus
					onChange={(e) => handleSearch(e.target.value)}
					defaultValue={searchParams.get("search")?.toString()}
					className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder="Search for items"
				/>
			</div>
		</div>
	);
}

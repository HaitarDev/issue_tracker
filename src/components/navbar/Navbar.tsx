"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function Navbar() {
  const currPathname = usePathname();

  return (
    <nav className="h-14 w-full border-b ">
      <div className="px-2 space-x-10 flex items-center h-full w-full ">
        <h1 className="font-bold leading-tight uppercase text-red-800">
          Issue Tracker
        </h1>
        <ul className="flex space-x-4 text-gray-800">
          <li>
            <Link
              href={"/"}
              className={`${
                currPathname === "/" ? "font-semibold " : "font-normal"
              }`}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href={"/issues"}
              className={`${
                currPathname === "/issues" ? "font-semibold " : "font-normal"
              }`}
            >
              Issues
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
export default Navbar;

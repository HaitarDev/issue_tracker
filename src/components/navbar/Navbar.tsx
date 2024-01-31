"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AuthStatus from "./AuthStatus";

function Navbar() {
  const currPathname = usePathname();
  const { status, data: session } = useSession();

  return (
    <nav className="h-14 w-full border-b shadow-sm  ">
      <div className=" flex items-center justify-between h-full max-w-screen-2xl mx-auto container">
        <div>
          <div className="space-x-10 flex items-center h-full w-full ">
            <h1 className="font-bold leading-tight uppercase text-primary">
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
                    currPathname === "/issues"
                      ? "font-semibold "
                      : "font-normal"
                  }`}
                >
                  Issues
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <AuthStatus />
        </div>
      </div>
    </nav>
  );
}
export default Navbar;

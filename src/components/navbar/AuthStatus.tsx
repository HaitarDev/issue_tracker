"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Skeleton from "react-loading-skeleton";

function AuthStatus() {
  const { data: session, status } = useSession();

  if (status === "loading") return <Skeleton circle width={40} height={40} />;
  return (
    <>
      {status === "authenticated" && (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage
                referrerPolicy="no-referrer"
                src={session.user?.image!}
                alt={session.user?.name!}
              />
              <AvatarFallback>
                {session.user?.name!.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{session.user?.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="hover:bg-destructive/90 hover:text-white">
              <Link href={"/api/auth/signout"}> Signout</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      {status === "unauthenticated" && (
        <Link href={"/api/auth/signin"}>Login</Link>
      )}
    </>
  );
}
export default AuthStatus;

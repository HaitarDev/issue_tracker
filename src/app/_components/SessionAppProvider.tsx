"use client";
import { SessionProvider } from "next-auth/react";

function SessionAppProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
export default SessionAppProvider;

import type { Metadata } from "next";
import { verifyAuth } from "@/lib/auth";
import { cookies } from "next/headers";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home Page",
  description: "homePage",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  let verifyAuthRes = null;
  if (token) {
    verifyAuthRes = await verifyAuth(token.value);
  }
  return (
    <main>
      {verifyAuthRes ? (
        <div>
          <div>
            <Link href="/users">Users</Link>
          </div>
          <div>
            <Link href="/test">测试</Link>
          </div>
          <div>
            <Link href="/logout">Logout</Link>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <Link href="/login">Login</Link>
          </div>
          <div>
            <Link href="/register">Register</Link>
          </div>
        </div>
      )}
      {children}
    </main>
  );
}

import { verifyAuth } from "@/lib/auth";
import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login",
  description: "loginPage",
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
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";
  return (
    <main>
      <div>
        <Link href="/">Home</Link>
      </div>
      {verifyAuthRes ? <h1>你已登录</h1> : children }
    </main>
  );
}

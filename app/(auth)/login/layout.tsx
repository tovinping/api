import { verifyAuth } from "@/lib/auth";
import type { Metadata } from "next";
import { cookies } from "next/headers";

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
  return (
    <main>
      {verifyAuthRes ? <h1>你已登录</h1> : children }
    </main>
  );
}

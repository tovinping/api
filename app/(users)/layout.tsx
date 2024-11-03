import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAuth } from "@/lib/auth";
import Link from "next/link";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (!token) {
    redirect("/login");
  }
  const verifyAuthRes = await verifyAuth(token.value);
  if (!verifyAuthRes) {
    redirect("/login");
  }
  return (
    <div>
      <nav>
        <Link href="/">Home</Link>
      </nav>
      {children}
    </div>
  );
}

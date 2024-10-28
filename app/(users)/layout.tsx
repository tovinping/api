import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title: "User Page",
  description: "userPage",
};

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div>
        <Link href="/">Home</Link>
      </div>
      {children}
    </section>
  );
}

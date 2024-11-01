import Link from "next/link";

export default async function UserLayout({
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

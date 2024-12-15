import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Profile",
    description: "userPage",
    other: {
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  };
}
export default async function UserPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const userId = (await params).userId;
  await generateMetadata();
  console.log(`UserPage? ${userId}`);
  return (
    <section>
      <h1>your select user: {userId}</h1>
    </section>
  );
}

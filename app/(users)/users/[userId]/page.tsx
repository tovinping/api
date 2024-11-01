import BackButton from "@/components/Button/BackButton";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "User PageA",
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
      <BackButton />
      <h1>your select user: {userId}</h1>
    </section>
  );
}

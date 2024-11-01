import Link from "next/link";

export default function About() {
  console.log(`server or client?`);
  return (
    <div>
      <h1>Users</h1>
      <ul>
        <li>
          <Link href="/users/tangwenping">tangwenping</Link>
        </li>
        <li>
          <Link href="/users/tovinping">tovinping</Link>
        </li>
        <li>
          <Link href="/users/testUser">testUser</Link>
        </li>
      </ul>
    </div>
  );
}


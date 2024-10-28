import Link from "next/link";

export default function About() {
  console.log(`server or client?`);
  return (
    <div>
      <h1>Users</h1>
      <ul>
        <li>
          <Link href="/users/1">User1</Link>
        </li>
        <li>
          <Link href="/users/3">User3</Link>
        </li>
        <li>
          <Link href="/users/4">User4</Link>
        </li>
      </ul>
    </div>
  );
}

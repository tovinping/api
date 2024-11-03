import { httpGet } from "@/lib/request/serverSide";
import Link from "next/link";

export default async function Users() {
  const data = await httpGet('/user?userId=jackson')
  if (!data) return;
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


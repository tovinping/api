import { cookies } from "next/headers";
import { verifyAuth } from "../auth";
import { redirect } from "next/navigation";

export async function httpGet(url: string) {
  url = process.env.NEXT_PUBLIC_API_URL + url
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (!token) return;
  const verifyAuthRes = await verifyAuth(token.value);
  if (!verifyAuthRes) return;
  const res = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });
  if (res.status === 401) {
    redirect("/login");
  }
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('httpGet error=', error, res.status, res.statusText, url)
  }
}

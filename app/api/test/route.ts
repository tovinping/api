import { NextResponse } from "next/server";
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export async function GET(request: Request) {
  await sleep(3000);
  return NextResponse.json({ name: "test", age: 18 });
}

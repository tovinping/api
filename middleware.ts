import { NextResponse, NextRequest } from "next/server";
import { verifyAuth } from "@/lib/auth";

// 定义不需要验证的路径
const publicPaths = [
  "/api/auth/login",
  "/api/auth/register",
  "/api/auth/logout",
  "/api/hello",
];

export async function middleware(request: NextRequest) {
  // 获取请求路径
  const path = request.nextUrl.pathname;

  // 如果是公开路径，直接放行
  if (publicPaths.includes(path)) {
    return NextResponse.next();
  }

  // 检查是否是 API 路由
  if (path.startsWith("/api/")) {
    let token = request.cookies.get("token")?.value;
    console.log("cookie=", token)
    if (!token) {
      token = request.headers.get("authorization")?.replace("Bearer ", "");
    }
    if (!token) {
      return NextResponse.json({ error: "未登录" }, { status: 401 });
    }
    // 验证 token
    const verRes = await verifyAuth(token);
    if (!verRes) {
      return NextResponse.json({ error: "token无效" }, { status: 401 });
    }
    console.log("verifyAuth=", verRes.username);
    return NextResponse.next();
  }

  return NextResponse.next();
}

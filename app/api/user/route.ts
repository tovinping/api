import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(request: Request) {
  try {
    // 获取 URL 查询参数
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    // 连接数据库
    await dbConnect();

    if (userId) {
      // 如果提供了用户ID，查询特定用户
      const user = await User.findOne({ username: userId }, { _id: 0 });
      return NextResponse.json(user);
    } else {
      return NextResponse.json({ message: "请提供用户ID" }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "服务器错误", error: (error as Error).message },
      { status: 500 }
    );
  }
}

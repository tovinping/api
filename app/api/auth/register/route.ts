import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  if (req.method !== "POST") {
    return NextResponse.json({ message: "方法不允许" }, { status: 405 });
  }

  try {
    const body = await req.json();

    const { username, password, email } = body;
    console.log(
      `username =${username}, password =${password}, email =${email}`
    );
    await dbConnect();

    // 检查用户是否已存在
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });
    console.log(`existingUser =${existingUser}`);
    if (existingUser) {
      return NextResponse.json(
        {
          message: "用户名或邮箱已被使用",
        },
        { status: 400 }
      );
    }

    // 创建新用户
    const user = await User.create({
      username,
      email,
      password,
    });
    await user.save();
    // 不返回密码字段
    user.password = undefined;
    console.log(`user =${user}`);
    return NextResponse.json({
      success: true,
      data: user,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

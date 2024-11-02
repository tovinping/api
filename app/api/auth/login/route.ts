import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  // 处理注册逻辑
  return NextResponse.json({ message: 'Login Successful' })
}
import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import User from '@/models/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function POST(req: Request) {
  try {
    await dbConnect()
    
    // 1. 获取请求数据
    const { username, password } = await req.json()

    // 2. 验证输入
    if (!username || !password) {
      return NextResponse.json(
        { error: '请提供用户名和密码' },
        { status: 400 }
      )
    }

    // 3. 查找用户
    const user = await User.findOne({ username }).select('+password')
    if (!user) {
      return NextResponse.json(
        { error: '用户不存在' },
        { status: 404 }
      )
    }
    console.log(`user = ${user}`)
    // 4. 验证密码
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      return NextResponse.json(
        { error: '密码错误' },
        { status: 401 }
      )
    }

    // 5. 生成 JWT token
    const token = jwt.sign(
      { 
        username: user.username,
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    )

    // 6. 返回用户信息和 token
    return NextResponse.json({
      message: '登录成功',
      user: {
        username: user.username
      },
      token
    })

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    )
  }
}
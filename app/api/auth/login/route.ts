import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import User from '@/models/User'
import { signJwt } from '@/lib/auth'
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
    // 4. 验证密码
    const isValid = await user.comparePassword(password)
    if (!isValid) {
      return NextResponse.json(
        { error: '密码错误' },
        { status: 401 }
      )
    }
    // 更新最后登录时间
    user.lastLoginAt = new Date()
    await user.save()
    // 5. 生成 JWT token
    const token = await signJwt({ username: user.username });

    const res = NextResponse.json({
      message: '登录成功',
      user: {
        username: user.username
      },
      token
    })

    res.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',  // 生产环境使用 true，开发环境使用 false
      sameSite: 'strict',
      path: '/',
    })
    return res;

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    )
  }
}
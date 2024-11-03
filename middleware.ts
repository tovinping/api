import { NextResponse, NextRequest } from 'next/server'
import { verifyAuth } from '@/lib/auth'

// 定义不需要验证的路径
const publicPaths = ['/api/auth/login', '/api/auth/register', '/api/auth/logout', '/api/hello']

export async function middleware(request: NextRequest) {
  // 获取请求路径
  const path = request.nextUrl.pathname
  
  // 如果是公开路径，直接放行
  if (publicPaths.includes(path)) {
    return NextResponse.next()
  }

  // 检查是否是 API 路由
  if (path.startsWith('/api/')) {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')

    if (!token) {
      return NextResponse.json(
        { error: '未登录' },
        { status: 401 }
      )
    }
    try {
      // 验证 token
      const verRes = await verifyAuth(request)
      console.log('verRes=', verRes)
      return NextResponse.next()
    } catch (error) {
      console.log('token verifyAuth error=', error)
      return NextResponse.json(
        { error: 'token无效' },
        { status: 401 }
      )
    }
  }

  return NextResponse.next()
}

import dbConnect from '@/lib/mongodb'
import User from '@/models/User'
import { signJwt } from '@/lib/auth'
import { resErr, resOk } from '../../utils/res'
export async function POST(req: Request) {
  try {
    await dbConnect()
    
    // 1. 获取请求数据
    const { username, password } = await req.json()

    // 2. 验证输入
    if (!username || !password) {
      return resErr('请输入用户名和密码')
    }

    // 3. 查找用户
    const user = await User.findOne({ username }).select('+password')
    if (!user) {
      return resErr('用户或密码不正确')
    }
    // 4. 验证密码
    const isValid = await user.comparePassword(password)
    if (!isValid) {
      return resErr('用户或密码不正确')
    }
    // 更新最后登录时间
    user.lastLoginAt = new Date()
    await user.save()
    // 5. 生成 JWT token
    const token = await signJwt({ username: user.username });

    const res = resOk({ username: user.username, token }, '登录成功')

    res.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',  // 生产环境使用 true，开发环境使用 false
      sameSite: 'strict',
      path: '/',
    })
    return res;

  } catch (error) {
    console.error('Login error:', error)
    return resErr('登录失败')
  }
}
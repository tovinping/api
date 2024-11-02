import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: '方法不允许' });
  }

  try {
    await dbConnect();

    const { username, email, password } = req.body;

    // 检查用户是否已存在
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });

    if (existingUser) {
      return res.status(400).json({ 
        message: '用户名或邮箱已被使用' 
      });
    }

    // 创建新用户
    const user = await User.create({
      username,
      email,
      password
    });

    // 不返回密码字段
    user.password = undefined;

    res.status(201).json({
      success: true,
      data: user
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: (error as Error).message
    });
  }
} 
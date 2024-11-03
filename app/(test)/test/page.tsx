'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
interface IUser {
    username: string
    email: string
    avatar: string
    isActive: boolean
    isEmailVerified: boolean
    role: string
    createdAt: string
    updatedAt: string
    lastLoginAt: string
}
export default function TestPage() {
  const router = useRouter()
  const [data, setData] = useState<IUser | null>(null)
  const getData = async () => {
    const res = await fetch('/api/user?userId=jackson')
    if (res.status === 401) {
      router.push('/login')
      return
    }
    const data = await res.json()
    setData(data)
  }
  useEffect(() => {
    getData()
  }, [])
  return <section>
    <h1>用户名:{data?.username}</h1>
    <h1>邮箱: {data?.email}</h1>
    <h1>头像: {data?.avatar}</h1>
    <h1>是否已失效: {data?.isActive ? '是' : '否'}</h1>
    <h1>邮件是否已验证: {data?.isEmailVerified ? '是' : '否'}</h1>
    <h1>角色: {data?.role}</h1>
    <h1>创建时间: {data?.createdAt}</h1>
    <h1>最后一次登录时间: {data?.lastLoginAt}</h1>
  </section>
}

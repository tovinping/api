"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { message } from "antd";

export default function Login() {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (data.code) {
      messageApi.error("登录失败");
    } else {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {contextHolder}
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            登录账户
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                用户名
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="请输入用户名"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                密码
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="密码"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              登录
            </button>
          </div>

          <div className="text-sm text-center">
            <Link
              href="/register"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              还没有账户？立即注册
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

type IBaseType = number | string //| object | boolean;

export interface ICallbackData {
  isEnd: boolean
  params: IBaseType
}

// 定义一个联合类型
type UnionToFunctionUnion<T> = T extends infer U ? (arg: U, cb: (data: ICallbackData) => void) => T | Promise<T> | void : never;

// 转换后的联合函数类型
type OutputType = UnionToFunctionUnion<IBaseType>;

function fibonacci(n: number): number {
  if (n == 1 || n == 2) {
    return 1
  }
  return fibonacci(n - 2) + fibonacci(n - 1);
}
type gg = (d: string, cb: (data: ICallbackData) => void) => void
const f1: gg = (d: string, cb: Function) => {
  // cb({ isEnd: true, params: 1 })
}
const f2: OutputType = () => 1
const f3: OutputType = (n: number) => Promise.resolve(n)
export const map = new Map<string, OutputType>([
  ['test', fibonacci],
  ['test1', f1],
  ['test2', f2],
  ['test3', f3],
]);

const g: string = 'aaa'
const param: IBaseType | undefined = undefined
const method = map.get(g) as (arg: IBaseType | undefined, cb: (data: ICallbackData) => void) => Promise<ICallbackData> | void | IBaseType
if (method) {
  // 根据 `OutputType` 的定义，`method` 的第一个参数类型是 `IBaseType`，回调函数需要返回 `ICallbackData` 类型
  const reuslt = method(param, (data: ICallbackData) => {
    console.log(data)
  })
  if (reuslt && reuslt instanceof Promise) {
    reuslt.then((data) => {
      console.log(data)
    })
  }
}
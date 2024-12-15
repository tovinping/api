import { NextResponse } from 'next/server'
export function resOk(data: object, msg: string) {
  return NextResponse.json({ msg: msg ?? 'success', data, code: 0 })
}

export function resErr(msg: string) {
  return NextResponse.json({ msg: msg ?? 'error', code: 1 })
}
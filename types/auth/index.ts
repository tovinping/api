export interface ILoginReq {
  id: string
  password: string
}
export interface ILoginRes {
  token: string
}
export interface IRegisterReq {
  id: string
  password: string
}
export interface IRegisterRes {
  token: string
}
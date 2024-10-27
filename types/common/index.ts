export enum API_CODE {
  OK,
  FAIL,
  NOT_ALLOWED,
}

export interface IRes<T = any> {
  code: API_CODE;
  data: T;
  msg: string;
}

export interface IJwt {
  id: string;
  name: string;
}

export class ResOk implements IRes {
  data: any;
  msg: string;
  code: API_CODE = API_CODE.OK;
  constructor(data: any, msg?: string) {
    this.data = data;
    this.msg = msg ?? "ok";
  }
}
export class ResFail implements IRes {
  data: any;
  msg: string;
  code: API_CODE = API_CODE.FAIL;
  constructor(data: any, msg?: string) {
    this.data = data;
    this.msg = msg ?? "fail";
  }
}
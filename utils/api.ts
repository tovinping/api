import type { NextApiRequest, NextApiResponse } from "next";
import { API_CODE, IJwt, ResOk, ResFail } from "@/types/common";
import encrypt from "@/utils/encrypt";

class MyReq {
  user: IJwt;
  constructor(req: NextApiRequest, user: IJwt) {
    this.user = user;
  }
}
class MyRes {
  res: NextApiResponse;
  constructor(res: NextApiResponse) {
    this.res = res;
  }
  ok<T>(data: T) {
    this.res.status(200).json(new ResOk(data));
  }
  fail(data: any) {
    this.res.status(200).json(new ResFail(data));
  }
}

async function checkAuth(req: NextApiRequest): Promise<IJwt> {
  const reqPath = req.url!.split("?")[0];
  const notAuth = ["/api/auth/login"].includes(reqPath);
  if (notAuth) return {} as IJwt;
  const token = req.headers.authorization;
  try {
    return encrypt.jwtVerify(token);
  } catch (error) {
    console.log(`checkAuto error token=${token?.length}`);
    throw API_CODE.NOT_ALLOWED;
  }
}
const CODE_MAP: Record<string | number, string> = {
  3: "NOT AUTH",
};

export default (cb: (req: MyReq, res: MyRes) => void) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const user = await checkAuth(req);
      const myReq = new MyReq(req, user);
      const myRes = new MyRes(res);
      cb(myReq, myRes);
    } catch (error: any) {
      console.log("catch error=", error);
      res.status(200).json({ code: error, msg: CODE_MAP[error] || "" });
    }
  };
};
``
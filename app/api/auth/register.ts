import { IRegisterRes } from "@/types/auth";
import apiUtils from "@/utils/api";
export default apiUtils((req, res) => {
  console.log("register");
  const registerRes: IRegisterRes = { token: "test" };
  res.ok<IRegisterRes>(registerRes);
});

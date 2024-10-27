import { ILoginRes } from "@/types/auth";
import apiUtils from "@/utils/api";
export default apiUtils((req, res) => {
  const loginRes: ILoginRes = { token: "jsonwebtokenAAA" };
  res.ok<ILoginRes>(loginRes);
});

import { ILoginRes } from "@/types/auth";
import apiUtils from "@/utils/api";
export default apiUtils((req, res) => {
  const loginRes: ILoginRes = { token: "test master" };
  res.ok<ILoginRes>(loginRes);
});

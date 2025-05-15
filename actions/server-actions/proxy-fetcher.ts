import axios from "axios";
import { ProxyRequest, ProxyResponse } from "./proxy-contracts";

export async function createData(
  link: string,
  data: any
): Promise<ProxyResponse> {
  try {
    const payload: ProxyRequest = { link, data };

    const response = await axios.post<ProxyResponse>(
      "/api/proxy/post",
      payload
    );

    return response.data;
  } catch (error: any) {
    return {
      status: 500,
      error: error.message,
    };
  }
}

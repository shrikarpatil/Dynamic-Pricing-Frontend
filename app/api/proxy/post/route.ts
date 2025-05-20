import { getBackendAPI } from "@/actions/getEnvVariables";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { link, data } = await req.json();
    const baseUrl = await getBackendAPI();
    const response = await axios.post(`${baseUrl}/${link}`, data);

    return NextResponse.json({ status: response.status, data: response.data });
  } catch (error: any) {
    const status = error.response?.status || 500;
    const errorMessage =
      error.response?.data || error.message || "Internal Server Error";
    return NextResponse.json(
      { success: false, error: errorMessage ,
       status :409 });
  }
}

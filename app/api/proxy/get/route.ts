import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { getBackendAPI } from "@/actions/getEnvVariables";

export async function POST(req: NextRequest) {
  try {
    const { link } = await req.json();
    const baseUrl = await getBackendAPI();
    console.log("In router");
    const response = await axios.get(`${baseUrl}/${link}`);
    return NextResponse.json({ success: true, data: response.data });
  } catch (error: any) {
    console.error("Proxy GET failed:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
      const { link } = await req.json();
        const response = await axios.get(`${process.env.BACKEND_BASE_URL}/${link}`);
      return NextResponse.json({ status: 200, data: response.data });
    } catch (error: any) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }
}
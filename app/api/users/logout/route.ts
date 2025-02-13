import { connectDb } from "@/db/dbConnection";
import { NextRequest, NextResponse } from "next/server";

connectDb();

export async function GET(req: NextRequest) {
  try {
    const response = NextResponse.json({
      messagae: "Logout successful",
      success: true,
    });

    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { connectDb } from "@/db/dbConnection";
import User from "@/app/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/app/helper/getDataFromToken";

connectDb();

export async function POST(req: NextRequest) {
  const userId = await getDataFromToken(req);

  const user = await User.findById(userId).select("-password");

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 400 });
  } else {
    return NextResponse.json(user);
  }
}

import { connectDb } from "@/db/dbConnection";
import User from "@/app/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectDb();

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const {token} = reqBody;
        console.log(token);

        const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}});

        if(!user){
            return NextResponse.json({error: "Invalid token"}, {status: 400});
        }
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({message: "Email verified successfully"}, {status: 200}); 
        
    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
     }
}
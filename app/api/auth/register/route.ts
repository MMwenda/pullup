import { connectDB } from "@/app/lib/mongoose";
import User from "@/app/lib/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req:Request) {

    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
        return NextResponse.json({
            error: "All fields are required"
        },
        {
            status: 400
        })
    };

    await connectDB();

    const existing = await User.findOne({email});
        if (existing) {
            return NextResponse.json({
                error: "Email already in use"
            },
            {
                status: 400
            })
        };
    
    const hashedPassword = await bcrypt.hash(password,10);
    //the 10 is the salt rounds, the number controls how complex the hashing is.
    //in the industry 10 is secure enough without being slow

    const user = await User.create({
        name,
        email,
        password:  hashedPassword,
    });

    return NextResponse.json(
        {
            message: "User created", 
            userId: user._id
        }, 
        {
            status: 201 //"created", more accurate than 200 in this case
        });
    
}
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { NextResponse } from "next/server";

import NextAuth from "next-auth";

export async function GET() {
    const session = await getServerSession(NextAuth(authOptions));

    if (!session) { 
        return NextResponse.json({ error: "Not authorized" }, { status: 400 });
    }

    return NextResponse.json({ success: session}, { status: 200 });
}
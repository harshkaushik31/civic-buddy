import { NextResponse } from "next/server";

export async function GET(req){
    return NextResponse.json(
        {message: "Health Check Route working properly"},
        {status: 200}
    )
}
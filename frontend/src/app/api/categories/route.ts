import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request){
    return NextResponse.json({"key": "params.categoryId"});
}


export async function POST(req: Request, res: Response){
    const data = await req.json()

    return NextResponse.json(data)
}

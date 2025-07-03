import { prisma } from "@/prisma/myclient";
import { NextResponse } from "next/server"

export async function POST(req) {
    try {
        const {type, addr, bedroom, bathroom, area, price, desc, imgUrl, lat, lon} = await req.json();

        const resp = await prisma.pOST.create({
            data: {
                type,
                address: addr,
                bedroom: parseInt(bedroom),
                bathroom: parseInt(bathroom),
                area: parseInt(area),
                price: parseInt(price),
                description: desc,
                image: imgUrl,
                ownerId: 1,
                lat: parseFloat(lat),
                lon: parseFloat(lon)
            }
        });

        return NextResponse.json({message: "Post Created.", data: resp});

    } catch (error) {
        console.log("Unexpected error:", error.message);
        return NextResponse.json({ error: error?.message || "Unknown error" }, { status: 500 });
    }
}
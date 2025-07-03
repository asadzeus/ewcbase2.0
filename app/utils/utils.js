import { NextResponse } from "next/server";
import { prisma } from "@/prisma/myclient";

export async function GetSelledHouses(setSelledHouses) {
    try {
        const resp = await fetch("/api/GetSelledHouses", {
            method: "GET"
        })

        const selledHouses = await resp.json();
        setSelledHouses(selledHouses);

    } catch (error) {
        console.error(error);
    }
}

export async function GetRentedHouses(setRentedHouses) {
    try {
        const resp = await fetch("/api/GetRentedHouses", {
            method: "GET"
        })

        const rentedHouses = await resp.json();
        setRentedHouses(rentedHouses);

    } catch (error) {
        console.error(error);
    }
}

export async function CreatePost(post) {
    try {
        const resp = await fetch("/api/CreatePost", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(
                post
            )
        })

        return resp;
    } catch (error) {
        console.error(error);
    }
}
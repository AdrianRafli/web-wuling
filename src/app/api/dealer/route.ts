import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const dealer = await prisma.dealer.findFirst({
      include: {
        hours: true,
      },
    });

    if (!dealer) {
      return NextResponse.json(
        { error: "Data dealer tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: dealer });
  } catch (error) {
    console.error("[GET /api/dealer]", error);
    return NextResponse.json(
      { error: "Gagal mengambil data dealer" },
      { status: 500 }
    );
  }
}
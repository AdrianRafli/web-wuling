import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured"); // ?featured=true → ambil isNew saja

    const cars = await prisma.car.findMany({
      where: {
        ...(category && category !== "Semua" ? { category } : {}),
        ...(featured === "true" ? { isNew: true } : {}),
      },
      select: {
        id: true,
        slug: true,
        name: true,
        tagline: true,
        category: true,
        thumbnail: true,
        isNew: true,
        isElectric: true,
        highlights: {
          orderBy: { order: "asc" },
          select: { text: true, order: true },
        },
        variants: {
          orderBy: { order: "asc" },
          select: {
            id: true,
            name: true,
            price: true,
            transmission: true,
          },
        },
      },
      orderBy: { id: "asc" },
    });

    // BigInt tidak bisa di-JSON.stringify langsung — konversi ke Number
    const serialized = cars.map((car) => ({
      ...car,
      variants: car.variants.map((v) => ({
        ...v,
        price: Number(v.price),
      })),
    }));

    return NextResponse.json({ data: serialized });
  } catch (error) {
    console.error("[GET /api/cars]", error);
    return NextResponse.json(
      { error: "Gagal mengambil data mobil" },
      { status: 500 }
    );
  }
}
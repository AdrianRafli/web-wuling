import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const car = await prisma.car.findUnique({
      where: { slug },
      include: {
        images: {
          orderBy: { order: "asc" },
        },
        highlights: {
          orderBy: { order: "asc" },
        },
        variants: {
          orderBy: { order: "asc" },
          include: {
            specs: true,
          },
        },
      },
    });

    if (!car) {
      return NextResponse.json(
        { error: "Mobil tidak ditemukan" },
        { status: 404 }
      );
    }

    // Ambil mobil lain (same category, exclude current) untuk section "Mobil Lainnya"
    const related = await prisma.car.findMany({
      where: {
        category: car.category,
        slug: { not: slug },
      },
      select: {
        slug: true,
        name: true,
        tagline: true,
        thumbnail: true,
        isNew: true,
        isElectric: true,
        variants: {
          orderBy: { order: "asc" },
          take: 1,
          select: { price: true, name: true },
        },
      },
      take: 3,
    });

    // Serialisasi BigInt
    const serialized = {
      ...car,
      variants: car.variants.map((v) => ({
        ...v,
        price: Number(v.price),
        specs: v.specs
          ? {
              ...v.specs,
              // features sudah Json di Prisma, tapi pastikan tipe array
              features: v.specs.features as string[],
            }
          : null,
      })),
      related: related.map((r) => ({
        ...r,
        variants: r.variants.map((v) => ({ ...v, price: Number(v.price) })),
      })),
    };

    return NextResponse.json({ data: serialized });
  } catch (error) {
    console.error("[GET /api/cars/[slug]]", error);
    return NextResponse.json(
      { error: "Gagal mengambil detail mobil" },
      { status: 500 }
    );
  }
}
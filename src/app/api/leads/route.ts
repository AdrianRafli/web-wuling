import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Tipe yang diterima dari form kontak
interface LeadPayload {
  name: string;
  phone: string;
  email?: string;
  carInterest?: string;
  type: "test-drive" | "pertanyaan" | "penawaran";
  preferredDate?: string;
  message?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: LeadPayload = await request.json();

    // Validasi field wajib
    const { name, phone, type } = body;
    if (!name?.trim() || !phone?.trim() || !type?.trim()) {
      return NextResponse.json(
        { error: "Field name, phone, dan type wajib diisi" },
        { status: 400 }
      );
    }

    // Validasi type
    const validTypes = ["test-drive", "pertanyaan", "penawaran"];
    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { error: `Type tidak valid. Gunakan: ${validTypes.join(", ")}` },
        { status: 400 }
      );
    }

    const lead = await prisma.lead.create({
      data: {
        name: name.trim(),
        phone: phone.trim(),
        email: body.email?.trim() || null,
        carInterest: body.carInterest?.trim() || null,
        type,
        preferredDate: body.preferredDate?.trim() || null,
        message: body.message?.trim() || null,
        status: "new",
      },
    });

    return NextResponse.json(
      { data: lead, message: "Lead berhasil disimpan" },
      { status: 201 }
    );
  } catch (error) {
    console.error("[POST /api/leads]", error);
    return NextResponse.json(
      { error: "Gagal menyimpan data" },
      { status: 500 }
    );
  }
}

// Opsional: GET /api/leads untuk keperluan admin (bisa dihapus jika tidak diperlukan)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status"); // ?status=new
    const type   = searchParams.get("type");   // ?type=test-drive

    const leads = await prisma.lead.findMany({
      where: {
        ...(status ? { status } : {}),
        ...(type   ? { type }   : {}),
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ data: leads });
  } catch (error) {
    console.error("[GET /api/leads]", error);
    return NextResponse.json(
      { error: "Gagal mengambil data leads" },
      { status: 500 }
    );
  }
}
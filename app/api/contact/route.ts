import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { sendContactEmail } from "@/app/lib/mailer";

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") ?? "";
    let email = "";
    let phone = "";
    let message = "";

    if (contentType.includes("application/json")) {
      const body = await request.json();
      email = String(body.email ?? "").trim();
      phone = String(body.phone ?? "").trim();
      message = String(body.message ?? "").trim();
    } else {
      const formData = await request.formData();
      email = String(formData.get("email") ?? "").trim();
      phone = String(formData.get("phone") ?? "").trim();
      message = String(formData.get("message") ?? "").trim();
    }

    if (!email || !phone || !message) {
      return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 });
    }

    await prisma.messages.create({
      data: { email, phone, message },
    });

    const emailResult = await sendContactEmail({ email, phone, message });

    return NextResponse.json({ ok: true, emailResult });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: "Unable to send message.", details: (error as Error).message },
      { status: 500 },
    );
  }
}

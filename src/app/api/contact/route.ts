import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, email, subject, message } = await req.json();

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // In production, wire this to an email service (Resend, SendGrid, etc.)
  // For now, log to console and return success so the form works end-to-end.
  console.log("[Contact Form]", { name, email, subject, message });

  return NextResponse.json({ ok: true });
}

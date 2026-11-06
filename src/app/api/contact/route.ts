import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address format." },
        { status: 400 }
      );
    }

    // Process contact request
    return NextResponse.json(
      { success: true, message: "Thank you! Your message has been received." },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Internal server error occurred." },
      { status: 500 }
    );
  }
}


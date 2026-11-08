import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "All fields are required. Please fill in your name, email, subject, and message." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format. Please provide a valid email address." },
        { status: 400 }
      );
    }

    const newEntry = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
    };

    // Safely save message locally so it is never lost
    try {
      const dataDir = path.join(process.cwd(), "data");
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      const filePath = path.join(dataDir, "messages.json");
      let messages: any[] = [];
      if (fs.existsSync(filePath)) {
        try {
          const fileData = fs.readFileSync(filePath, "utf8");
          messages = JSON.parse(fileData);
          if (!Array.isArray(messages)) messages = [];
        } catch {
          messages = [];
        }
      }
      messages.unshift(newEntry);
      fs.writeFileSync(filePath, JSON.stringify(messages, null, 2), "utf8");
    } catch (saveErr) {
      console.warn("Could not save to messages.json:", saveErr);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thank you! Your message has been transmitted successfully to Sangmeshwar.",
        data: newEntry,
      },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Internal server error occurred." },
      { status: 500 }
    );
  }
}

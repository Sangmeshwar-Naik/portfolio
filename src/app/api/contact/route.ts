import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface MessageEntry {
  id: string;
  timestamp: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read?: boolean;
}

const dataDir = path.join(process.cwd(), "data");
const filePath = path.join(dataDir, "messages.json");

function getStoredMessages(): MessageEntry[] {
  try {
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, "utf8");
      const parsed = JSON.parse(fileData);
      return Array.isArray(parsed) ? parsed : [];
    }
  } catch {
    // Return empty on read error
  }
  return [];
}

function saveMessages(messages: MessageEntry[]) {
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(messages, null, 2), "utf8");
  } catch (err) {
    console.warn("Could not save to messages.json:", err);
  }
}

// GET /api/contact - Retrieve all contact messages for notification center
export async function GET() {
  const messages = getStoredMessages();
  return NextResponse.json({ success: true, messages });
}

// POST /api/contact - Submit new message
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

    const newEntry: MessageEntry = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
      read: false,
    };

    const messages = getStoredMessages();
    messages.unshift(newEntry);
    saveMessages(messages);

    return NextResponse.json(
      {
        success: true,
        message: "Thank you! Your message has been transmitted successfully to Sangmeshwar.",
        data: newEntry,
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Internal server error occurred.";
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}

// PATCH /api/contact - Mark as read or toggle status
export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, read, markAllAsRead } = body;

    let messages = getStoredMessages();

    if (markAllAsRead) {
      messages = messages.map((m) => ({ ...m, read: true }));
    } else if (id) {
      messages = messages.map((m) =>
        m.id === id ? { ...m, read: read ?? !m.read } : m
      );
    }

    saveMessages(messages);
    return NextResponse.json({ success: true, messages });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Internal server error.";
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}

// DELETE /api/contact - Delete a message or clear all
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const clearAll = searchParams.get("clearAll") === "true";

    let messages = getStoredMessages();

    if (clearAll) {
      messages = [];
    } else if (id) {
      messages = messages.filter((m) => m.id !== id);
    }

    saveMessages(messages);
    return NextResponse.json({ success: true, messages });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Internal server error.";
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}

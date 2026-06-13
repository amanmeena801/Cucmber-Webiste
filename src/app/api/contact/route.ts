import { NextRequest, NextResponse } from "next/server";
import { saveInquiry, getAllInquiries, deleteInquiry } from "@/lib/db";
import { sendInquiryEmail } from "@/lib/mail";

// Handle form submission (POST)
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { name, company, email, phone, crop, qty, msg } = data;

    // Validate request
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required fields." },
        { status: 400 }
      );
    }

    const inquiry = {
      name,
      company: company || "",
      email,
      phone: phone || "",
      crop: crop || "English Cucumber",
      qty: qty || "",
      msg: msg || "",
    };

    // 1. Save details permanently to configured database (Supabase or SQLite fallback)
    const lastID = await saveInquiry(inquiry);
    console.log(`Saved customer inquiry (ID/Result: ${lastID})`);

    // 2. Send email notification
    let mailResult: { success: boolean; previewUrl: string | null | false } = { success: false, previewUrl: null };
    try {
      mailResult = await sendInquiryEmail(inquiry);
    } catch (mailErr) {
      console.error("Failed to send email notification:", mailErr);
      // We do not fail the request if database insertion succeeded
    }

    return NextResponse.json({
      success: true,
      message: "Customer inquiry logged permanently and notification email sent.",
      id: lastID,
      emailSent: mailResult.success,
      previewUrl: mailResult.previewUrl,
    });
  } catch (error: any) {
    console.error("Error handling contact submission:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}

// Fetch all saved inquiries (GET)
export async function GET() {
  try {
    const inquiries = await getAllInquiries();
    return NextResponse.json(inquiries);
  } catch (error: any) {
    console.error("Error fetching inquiries:", error);
    return NextResponse.json(
      { error: "Failed to fetch inquiries", details: error.message },
      { status: 500 }
    );
  }
}

// Delete a specific inquiry (DELETE)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const idStr = searchParams.get("id");

    if (!idStr) {
      return NextResponse.json({ error: "Inquiry ID is required" }, { status: 400 });
    }

    const id = parseInt(idStr);

    // Call the dynamic db.ts delete handler
    await deleteInquiry(id);

    return NextResponse.json({ success: true, message: `Inquiry #${id} deleted.` });
  } catch (error: any) {
    console.error("Error deleting inquiry:", error);
    return NextResponse.json(
      { error: "Failed to delete inquiry", details: error.message },
      { status: 500 }
    );
  }
}

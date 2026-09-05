import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { saveRequestToSupabase } from "@/lib/supabase";

function formatDateDisplay(dateStr: string): string {
  if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr.trim())) return dateStr;
  const parts = dateStr.trim().split("-");
  const year = parts[0];
  const monthIdx = parseInt(parts[1], 10) - 1;
  const day = parts[2].padStart(2, "0");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  if (monthIdx >= 0 && monthIdx < 12) {
    return `${day}-${months[monthIdx]}-${year}`;
  }
  return dateStr;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    // Generate unique Application ID
    const todayStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const randomHex = Math.random().toString(36).substring(2, 7).toUpperCase();
    const applicationId = `GC-${todayStr}-${randomHex}`;

    // Extract form fields
    const firstName = (formData.get("firstName") as string)?.trim() || "";
    const lastName = (formData.get("lastName") as string)?.trim() || "";
    const email = (formData.get("email") as string)?.trim() || "";
    const phone = (formData.get("phone") as string)?.trim() || "";
    const passportNumber = (formData.get("passportNumber") as string)?.trim() || "";
    const confirmPassportNumber = (formData.get("confirmPassportNumber") as string)?.trim() || "";
    const examinationCountry = (formData.get("examinationCountry") as string)?.trim() || "Pakistan";
    const city = (formData.get("city") as string)?.trim() || "";
    const destinationCountry = (formData.get("destinationCountry") as string)?.trim() || "";
    const appointmentType = (formData.get("appointmentType") as string)?.trim() || "Standard Appointment";
    const preferredAppointmentDate = (formData.get("preferredAppointmentDate") as string)?.trim() || "";
    const dateOfBirth = (formData.get("dateOfBirth") as string)?.trim() || "";
    const nationality = (formData.get("nationality") as string)?.trim() || "Pakistani";
    const gender = (formData.get("gender") as string)?.trim() || "";
    const maritalStatus = (formData.get("maritalStatus") as string)?.trim() || "";
    const passportIssueDate = (formData.get("passportIssueDate") as string)?.trim() || "";
    const passportIssuePlace = (formData.get("passportIssuePlace") as string)?.trim() || "";
    const passportExpiryDate = (formData.get("passportExpiryDate") as string)?.trim() || "";
    const visaType = (formData.get("visaType") as string)?.trim() || "";
    const positionApplied = (formData.get("positionApplied") as string)?.trim() || "";
    const otherPosition = (formData.get("otherPosition") as string)?.trim() || "";
    const nationalId = (formData.get("nationalId") as string)?.trim() || "";
    const additionalInformation = (formData.get("additionalInformation") as string)?.trim() || "";

    // Server-side validation
    if (!firstName || !lastName || !passportNumber || !email || !phone || !city || !destinationCountry) {
      return NextResponse.json(
        { success: false, message: "Missing required form fields." },
        { status: 400 }
      );
    }

    if (passportNumber !== confirmPassportNumber) {
      return NextResponse.json(
        { success: false, message: "Passport numbers do not match." },
        { status: 400 }
      );
    }

    // Extract passport copy file
    const passportFile = formData.get("passportCopy") as File | null;
    if (!passportFile || typeof passportFile === "string") {
      return NextResponse.json(
        { success: false, message: "Please attach a valid passport copy image or PDF." },
        { status: 400 }
      );
    }

    const allowedPassportTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg", "application/pdf"];
    if (!allowedPassportTypes.includes(passportFile.type) || passportFile.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, message: "Passport copy must be a JPEG, PNG, WEBP, or PDF under 5MB." },
        { status: 400 }
      );
    }

    const passportArrayBuffer = await passportFile.arrayBuffer();
    const passportBuffer = Buffer.from(passportArrayBuffer);
    const passportFileName = `${applicationId}_PASSPORT_${passportFile.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;

    // Extract screenshot file
    const screenshotFile = formData.get("screenshot") as File | null;
    if (!screenshotFile || typeof screenshotFile === "string") {
      return NextResponse.json(
        { success: false, message: "Please attach a valid payment screenshot image." },
        { status: 400 }
      );
    }

    // Validate screenshot size & extension (<= 5MB)
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (!allowedMimeTypes.includes(screenshotFile.type) || screenshotFile.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, message: "Screenshot must be a JPEG, PNG, or WEBP image under 5MB." },
        { status: 400 }
      );
    }

    const arrayBuffer = await screenshotFile.arrayBuffer();
    const screenshotBuffer = Buffer.from(arrayBuffer);
    const screenshotFileName = `${applicationId}_SCREENSHOT_${screenshotFile.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;

    // 1. Save to Supabase database (if configured)
    await saveRequestToSupabase({
      application_id: applicationId,
      examination_country: examinationCountry,
      city: city,
      destination_country: destinationCountry,
      appointment_type: appointmentType,
      preferred_appointment_date: preferredAppointmentDate,
      first_name: firstName,
      last_name: lastName,
      date_of_birth: dateOfBirth,
      nationality: nationality,
      gender: gender,
      marital_status: maritalStatus,
      passport_number: passportNumber,
      passport_issue_date: passportIssueDate,
      passport_issue_place: passportIssuePlace,
      passport_expiry_date: passportExpiryDate,
      visa_type: visaType,
      position_applied: positionApplied,
      other_position: otherPosition,
      email: email,
      phone: phone,
      national_id: nationalId,
      additional_information: additionalInformation,
      payment_screenshot_path: screenshotFileName,
      status: "Pending",
    });

    // 2. Setup Nodemailer Transporter
    const host = (process.env.EMAIL_HOST || "smtp.gmail.com").trim();
    const port = Number((process.env.EMAIL_PORT || "587").toString().trim());
    const user = (process.env.EMAIL_USER || "gamcacentre9@gmail.com").trim();
    const pass = (process.env.EMAIL_PASSWORD || "blqcyhszdpgysvyy").replace(/[\r\n\s]/g, "");
    const toEmail = (process.env.EMAIL_TO || "mts.pk@hotmail.com").trim();
    
    // Format dates for DD-MMM-YYYY display
    const formattedPreferredDate = formatDateDisplay(preferredAppointmentDate);
    const formattedDob = formatDateDisplay(dateOfBirth);
    const formattedIssueDate = formatDateDisplay(passportIssueDate);
    const formattedExpiryDate = formatDateDisplay(passportExpiryDate);

    // Prepare HTML Email
    const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f6f9; margin: 0; padding: 20px; color: #1e293b; }
        .card { max-width: 650px; background: #ffffff; margin: 0 auto; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.08); border: 1px solid #e2e8f0; }
        .header { background: #061224; color: #ffffff; padding: 30px; text-align: center; border-bottom: 4px solid #D4AF37; }
        .header h1 { margin: 0; font-size: 26px; color: #D4AF37; letter-spacing: 1px; }
        .header p { margin: 6px 0 0 0; font-size: 14px; color: #94a3b8; font-weight: 500; }
        .badge { display: inline-block; background: #D4AF37; color: #061224; font-weight: bold; padding: 6px 14px; border-radius: 20px; font-size: 14px; margin-top: 12px; }
        .section { padding: 24px 30px; border-bottom: 1px solid #f1f5f9; }
        .section-header { font-size: 14px; font-weight: 700; color: #061224; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 14px; padding-left: 10px; border-left: 3px solid #D4AF37; }
        .row { display: flex; margin-bottom: 10px; font-size: 14px; line-height: 1.5; }
        .label { width: 42%; font-weight: 600; color: #64748b; }
        .value { width: 58%; color: #0f172a; font-weight: 600; }
        .footer { background: #f8fafc; padding: 20px 30px; text-align: center; font-size: 12px; color: #94a3b8; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h1>GAMCA CENTRE</h1>
          <p>Official Wafid Medical Token Booking Assistance</p>
          <div class="badge">Application ID: ${applicationId}</div>
        </div>

        <div class="section">
          <div class="section-header">APPLICATION SUMMARY</div>
          <div class="row"><div class="label">Application ID:</div><div class="value">${applicationId}</div></div>
          <div class="row"><div class="label">Submission Date:</div><div class="value">${new Date().toLocaleString()}</div></div>
          <div class="row"><div class="label">Appointment Type:</div><div class="value">${appointmentType}</div></div>
          <div class="row"><div class="label">Preferred Date:</div><div class="value">${formattedPreferredDate}</div></div>
        </div>

        <div class="section">
          <div class="section-header">APPOINTMENT INFORMATION</div>
          <div class="row"><div class="label">Examination Country:</div><div class="value">${examinationCountry}</div></div>
          <div class="row"><div class="label">City:</div><div class="value">${city}</div></div>
          <div class="row"><div class="label">Country Traveling To:</div><div class="value">${destinationCountry}</div></div>
        </div>

        <div class="section">
          <div class="section-header">CANDIDATE INFORMATION</div>
          <div class="row"><div class="label">First Name:</div><div class="value">${firstName}</div></div>
          <div class="row"><div class="label">Last Name:</div><div class="value">${lastName}</div></div>
          <div class="row"><div class="label">Date of Birth:</div><div class="value">${formattedDob}</div></div>
          <div class="row"><div class="label">Nationality:</div><div class="value">${nationality}</div></div>
          <div class="row"><div class="label">Gender:</div><div class="value">${gender}</div></div>
          <div class="row"><div class="label">Marital Status:</div><div class="value">${maritalStatus}</div></div>
        </div>

        <div class="section">
          <div class="section-header">PASSPORT INFORMATION</div>
          <div class="row"><div class="label">Passport Number:</div><div class="value" style="color: #1e3a8a; font-size: 16px;">${passportNumber}</div></div>
          <div class="row"><div class="label">Passport Issue Date:</div><div class="value">${formattedIssueDate}</div></div>
          <div class="row"><div class="label">Passport Issue Place:</div><div class="value">${passportIssuePlace}</div></div>
          <div class="row"><div class="label">Passport Expiry Date:</div><div class="value">${formattedExpiryDate}</div></div>
        </div>

        <div class="section">
          <div class="section-header">VISA / EMPLOYMENT INFORMATION</div>
          <div class="row"><div class="label">Visa Type:</div><div class="value">${visaType}</div></div>
          <div class="row"><div class="label">Position Applied For:</div><div class="value">${positionApplied} ${otherPosition ? `(${otherPosition})` : ""}</div></div>
        </div>

        <div class="section">
          <div class="section-header">CONTACT INFORMATION</div>
          <div class="row"><div class="label">Email Address:</div><div class="value">${email}</div></div>
          <div class="row"><div class="label">Phone Number:</div><div class="value">${phone}</div></div>
          <div class="row"><div class="label">National ID / CNIC:</div><div class="value">${nationalId}</div></div>
        </div>

        <div class="section">
          <div class="section-header">ADDITIONAL INFORMATION</div>
          <div class="row"><div class="label">Additional Notes:</div><div class="value">${additionalInformation || "None"}</div></div>
        </div>

        <div class="section">
          <div class="section-header">ATTACHED DOCUMENTS (2 ATTACHMENTS)</div>
          <div class="row"><div class="label">1. Passport Copy:</div><div class="value">${passportFileName}</div></div>
          <div class="row"><div class="label">2. Payment Screenshot:</div><div class="value">${screenshotFileName}</div></div>
          <div class="row"><div class="label">Submission Time:</div><div class="value">${new Date().toLocaleString()}</div></div>
        </div>

        <div class="footer">
          Gamca Centre Concierge Portal &bull; gamcacentre9@gmail.com &bull; +92 322 7840807
        </div>
      </div>
    </body>
    </html>
    `;

    if (pass) {
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
      });

      await transporter.sendMail({
        from: `Gamca Centre <${user}>`,
        to: toEmail,
        replyTo: email,
        subject: `New Gamca Token Request — ${firstName} ${lastName} — ${passportNumber}`,
        html: htmlBody,
        attachments: [
          {
            filename: passportFileName,
            content: passportBuffer,
          },
          {
            filename: screenshotFileName,
            content: screenshotBuffer,
          },
        ],
      });
    } else {
      console.log("SMTP credentials missing. Form submission processed safely.");
    }

    return NextResponse.json({
      success: true,
      applicationId,
      message: "Application submitted successfully.",
    });

  } catch (error: unknown) {
    console.error("API Token submission error:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}

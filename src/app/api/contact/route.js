import { db } from "@/app/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    console.log("Received request:", req);
    const body = await req.json();
    const { name, email, subject, message, service,contactNumber } = body; // <-- add service

    // Save to Firestore
    await addDoc(collection(db, "contacts"), {
      name,
      email,
      subject,
      message,
      service, // <-- save service
      contactNumber,
      timestamp: serverTimestamp(),
      status: "new"
    });

    // Setup Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Send email to the user
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank you for contacting TruVedas",
      html: `
        <h2>Thank you for your inquiry!</h2>
        <p>Dear ${name},</p>
        <p>We have received your message and will get back to you within 24 hours.</p>
        <div style="background: #f0f9ff; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <h3>Your Message:</h3>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Service:</strong> ${service || "Not specified"}</p>
          <p><strong>Message:</strong> ${message}</p>
        </div>
        <p>Best regards,<br/>The TruVedas Team</p>
      `
    });

    // Send email to admin
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "shubhamraut7949@gmail.com",
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Service:</strong> ${service || "Not specified"}</p>
        <p><strong>Message:</strong> ${message}</p>
        <p><strong>Contact Number:</strong> ${contactNumber || "Not provided"}</p>
      `
    });

    return new Response(JSON.stringify({ message: "Success" }), { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ message: "Error sending message" }), { status: 500 });
  }
}

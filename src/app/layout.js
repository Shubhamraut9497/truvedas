import { Montserrat } from "next/font/google";
import "./globals.css";

// ✅ Import Montserrat instead of Geist
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat", // Custom CSS variable
  weight: ["300", "400", "500", "600", "700"], // You can add more if needed
  display: "swap",
});

export const metadata = {
  title: "Truveda - Compliance & Workforce Solutions",
  description: "Simplifying compliance and workforce solutions with technology-driven strategies.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} antialiased`}
        style={{ fontFamily: "var(--font-montserrat)" }}
      >
        {children}
      </body>
    </html>
  );
}

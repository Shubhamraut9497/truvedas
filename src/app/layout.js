import "./globals.css";

export const metadata = {
  title: "Truveda - Compliance & Workforce Solutions",
  description: "Simplifying compliance and workforce solutions with technology-driven strategies.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="antialiased"
        style={{ fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}

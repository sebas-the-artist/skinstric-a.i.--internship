import type { Metadata } from "next";
import "./globals.css";
import AppShell from "../components/layout/AppShell";

export const meta : Metadata = {
  title: "Skinstric AI",
  description: "AI-powered skincare analysis experience",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="layout__shell">
          <AppShell>{children}</AppShell>
        </div>
      </body>
    </html>
  );
}

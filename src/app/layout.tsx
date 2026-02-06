import type { Metadata } from "next";
import "../styles/globals.css";
import "../styles/skinstric.css";
import MainNav from "../components/layout/MainNav";
import AppShell from "../components/layout/AppShell";

export const metadata: Metadata = {
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
          <MainNav />
          <AppShell>{children}</AppShell>
        </div>
      </body>
    </html>
  );
}

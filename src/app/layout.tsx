import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppShell } from "@/components/AppShell";

export const metadata: Metadata = {
  title: "Fit · En forma juntos",
  description:
    "Recomposición corporal en pareja: entrenos, nutrición económica y progreso compartido hasta la boda.",
  manifest: "/manifest.json",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "Fit" }
};

export const viewport: Viewport = {
  themeColor: "#d92660",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-ink-50 text-ink-900 antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}

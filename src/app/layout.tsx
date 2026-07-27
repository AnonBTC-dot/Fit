import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppShell } from "@/components/AppShell";

export const metadata: Metadata = {
  title: "Fit · En forma juntos",
  description:
    "Recomposición corporal en pareja: entrenos estilo Fuertafit, nutrición rica y progreso compartido.",
  manifest: "/manifest.json",
  icons: { icon: "/icons/icon-192.png", apple: "/icons/icon-192.png" },
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "Fit" }
};

export const viewport: Viewport = {
  themeColor: "#15181e",
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

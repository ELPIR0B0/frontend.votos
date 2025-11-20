import "./../styles/globals.css";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";

const font = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Predicción de intención de voto (KNN)",
  description:
    "Explora un modelo KNN de intención de voto y genera pronósticos para nuevos perfiles.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={font.className}>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit, DM_Sans } from "next/font/google";
import Footer from "@/components/Footer";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://quempo.tech"),
  title: "Quempo | Viajes Compartidos a la Cordillera",
  description: "Conecta viajes a Farellones, El Colorado, La Parva y Valle Nevado. Rápido, directo por WhatsApp y sin comisiones.",
  keywords: ["carpool ski", "carpooling farellones", "valle nevado subida", "el colorado viajes", "quempo cordillera"],
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Quempo 🏔️ | Carpooling a la Cordillera",
    description: "Encuentra u ofrece cupos a Farellones, El Colorado, La Parva y Valle Nevado. Contacto directo por WhatsApp en 2 segundos.",
    url: "https://quempo.tech",
    siteName: "Quempo",
    locale: "es_CL",
    type: "website",
    images: [
      {
        url: "/plomo/desktop/plomoDesktop2.webp",
        width: 1200,
        height: 630,
        alt: "Quempo - Viajes Compartidos a la Cordillera",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Quempo 🏔️ | Viajes Compartidos a la Cordillera",
    description: "Encuentra u ofrece cupos a Farellones, El Colorado, La Parva y Valle Nevado.",
    images: ["/plomo/desktop/plomoDesktop2.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${plusJakartaSans.variable} ${outfit.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Footer />
      </body>
    </html>
  );
}

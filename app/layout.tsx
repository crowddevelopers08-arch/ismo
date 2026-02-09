import type React from "react"
import type { Metadata } from "next"
import { Outfit } from "next/font/google"
import Script from "next/script"
import "./globals.css"

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
})

export const metadata: Metadata = {
  title: "Dental-care-lp Welcome to Alora Dental",
  description:
    "Bangalore's Most Trusted Dental Clinic for Advanced Care.",
  generator: 'Nextjs15',
  icons: {
    icon: [
      {
        url: "/Alo.jpg",
        sizes: "any",
      },
      {
        url: "/Alo.jpg",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/Alo.jpg",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/Alo.jpg",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "icon",
        url: "/Alo.jpg",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/Alo.jpg",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${outfit.variable} antialiased`}>
      <head>
        {/* Google Ads Conversion Tracking */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-16722442662"
          strategy="afterInteractive"
        />
        <Script
          id="google-ads-conversion"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-16722442662');
              gtag('config', 'AW-16722442662/hLpZCIOj_ZcbEKbz8KU-', {
                'phone_conversion_number': '80797 91010'
              });
            `,
          }}
        />
      </head>
      <body className="font-sans">
        {children}
      </body>
    </html>
  )
}
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
  title: "ISMO Clinic, Chennai",
  description:
    "Regrow Thicker,Fuller Hair atISMO Clinic, Chennai",
  generator: 'Nextjs15',
  icons: {
    icon: [
      {
        url: "/ismocolour.png",
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
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "vksd5k7y58");
          `}
        </Script>
      </head>
      <body className="font-sans">
        {children}
      </body>
    </html>
  )
}
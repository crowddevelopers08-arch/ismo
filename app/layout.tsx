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
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NZLH7T2G');
          `}
        </Script>
        
        {/* Microsoft Clarity */}
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
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-NZLH7T2G"
            height="0" 
            width="0" 
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        
        {children}
      </body>
    </html>
  )
}
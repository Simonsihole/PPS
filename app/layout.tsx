import type { Metadata } from 'next'
import { Playfair_Display, Lato } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-serif'
});

const lato = Lato({ 
  subsets: ["latin"],
  weight: ['300', '400', '700'],
  variable: '--font-sans'
});

export const metadata: Metadata = {
  title: 'Pricilia',
  description: 'A quiet space for the little woman',
  generator: 'myself',
  icons: {
    icon: [
      {
        url: '/love00.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/love00.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/love00.png',
        type: 'image/svg+xml',
      },
    ],
    apple: '/love00.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${lato.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

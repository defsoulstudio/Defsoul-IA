import type { Metadata } from 'next'
import './globals.css'
import '@fontsource/manrope/200.css'
import '@fontsource/manrope/300.css'
import '@fontsource/manrope/400.css'
import '@fontsource/manrope/500.css'
import '@fontsource/manrope/700.css'
 
import { GeistSans, GeistMono } from 'geist/font'
 
import { PageTransition } from '@/components/core/PageTransition'
import { Cursor } from '@/components/effects/Cursor'
 
export const metadata: Metadata = {
  title: 'Defsoul Studio',
  description: 'Technology with soul.',
}
 
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.className} ${GeistMono.variable} overflow-x-hidden bg-[#040405] antialiased`}
      >
        {/* Cursor fora do PageTransition — persiste entre navegações */}
        <Cursor />
        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  )
}
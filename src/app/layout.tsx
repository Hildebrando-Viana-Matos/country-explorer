import type { Metadata } from 'next'
// eslint-disable-next-line camelcase
import { Nunito_Sans } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/header'
import { Providers } from './providers'

const nunitoSans = Nunito_Sans({
  weight: ['300', '600', '800'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'InHouse Project',
  description: 'Made by Hildebrando',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${nunitoSans.className} antialiased bg-background`}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  )
}

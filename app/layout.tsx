// IMPORTS -
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import Navbar from "./components/navbar/Navbar";
import './globals.css'

const font = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700']
})

export const metadata: Metadata = {
  title: 'Travel App',
  description: 'By Abdul Rehan Najam',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Navbar />
        {children}
        </body>
    </html>
  )
}

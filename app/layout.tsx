import type { Metadata } from 'next'
import { ThemeProvider } from "@/components/theme-provider"
import { Inter } from 'next/font/google'
import './globals.css';
import NavBar from '@/components/navBar';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'WriteScribe',
  description: 'Scribe while you write. Anything, Anywhere',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
        <NavBar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

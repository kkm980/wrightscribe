import type { Metadata } from 'next'
import { ThemeProvider } from "@/components/theme-provider"
import { Inter } from 'next/font/google'
import './globals.css';
import NavBar from '@/components/navBar';
import { Providers } from "@/redux/provider";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'WrightScribe',
  description: 'A Wright software that makes you to write',
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
          <Providers>
             <NavBar />
          {children}
          </Providers>
       
        </ThemeProvider>
      </body>
    </html>
  )
}

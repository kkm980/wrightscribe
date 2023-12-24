"use client"

import { ModeToggle } from '@/components/ThemeToggler'
import { useTheme } from 'next-themes';
import Image from 'next/image'
import { useEffect } from 'react';

export default function NavBar() {
  const { theme, setTheme } = useTheme();

  // You can use the `setTheme` function to switch between light and dark themes
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <main className="backdrop-blur-sm flex h-[60px] w-[100%] items-center justify-between px-[10px] border sticky top-0 z-[999]">
      <ModeToggle/>
    </main>
  )
}
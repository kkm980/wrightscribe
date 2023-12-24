"use client"

import { ModeToggle } from '@/components/ThemeToggler'
import { useTheme } from 'next-themes';
import Image from 'next/image'
import { useEffect } from 'react';

export default function NavBar() {
  const { theme, setTheme } = useTheme();

  // `theme` will be either "light" or "dark" based on the user's preference
  console.log("Current theme:", theme);

  // You can use the `setTheme` function to switch between light and dark themes
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  useEffect(()=>{
   console.log(theme, "theme");
  },[])
  return (
    <main className="backdrop-blur-sm flex h-[60px] w-[100%] items-center justify-between px-[10px] border border-[red] fixed top-0">
      <ModeToggle/>
    </main>
  )
}
"use client"

import { ModeToggle } from '@/components/ThemeToggler'
import { useTheme } from 'next-themes';
import Image from 'next/image'
import { useEffect, useState } from 'react';

export default function NavBar() {
  const [scrolled, setScrolled] = useState<boolean>(false); // for home page keep false
  useEffect(() => {
    // create function
    const onScroll = () => {
      // 50 will be our banner size..we change it as per req
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    // event fires when scrolled and pass the function
    window.addEventListener("scroll", onScroll);
    // when comp get remove from dom remove it that event and pass the same function
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const { theme, setTheme } = useTheme();

  // You can use the `setTheme` function to switch between light and dark themes
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <main className="backdrop-blur-sm flex h-[60px] w-[100%] items-center justify-between px-[10px] sticky top-0 z-[999]"
      style={{boxShadow:scrolled?theme==="light"?"0px 4px 6px rgba(0, 0, 0, 0.1)":"0px 4px 6px rgba(255, 255, 255, 0.2)":"none"}}
    >
      <ModeToggle/>
    </main>
  )
}
"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { gsap } from 'gsap';

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 150;
      setIsScrolled(scrolled);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Initial animation
  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(navRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 1, ease: "power3.out" }
      );
    }
  }, []);

  return (
    <div 
      ref={navRef}
      className={`fixed top-0 right-0 py-6 px-8 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur shadow-sm w-full' : 'bg-transparent'
      }`}
    >
      <div className="flex items-center justify-end gap-8">
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/courses" className="text-sm font-medium hover:text-primary transition-colors">
            Courses
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            Log In
          </Button>
        </div>
      </div>
    </div>
  );
}
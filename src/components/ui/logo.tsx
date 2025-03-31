"use client";

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';

interface LogoProps {
  withLink?: boolean;
}

export function Logo({ withLink = true }: LogoProps) {
  const logoRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  
  // Handle visibility based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide logo when scrolling down past threshold
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        if (isVisible) {
          setIsVisible(false);
          if (logoRef.current) {
            gsap.to(logoRef.current, {
              y: -150,
              opacity: 0,
              duration: 0.5,
              ease: "power3.out"
            });
          }
        }
      } 
      // Show logo when scrolling back to top
      else if (currentScrollY < 100) {
        if (!isVisible) {
          setIsVisible(true);
          if (logoRef.current) {
            gsap.to(logoRef.current, {
              y: 0,
              opacity: 1,
              duration: 0.5,
              ease: "power3.out"
            });
          }
        }
      }
      
      lastScrollY.current = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);
  
  // Initial animation
  useEffect(() => {
    if (logoRef.current) {
      gsap.fromTo(logoRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: "power3.out" }
      );
    }
  }, []);

  const LogoContent = (
    <div 
      ref={logoRef} 
      className="relative transition-transform duration-300 hover:scale-105"
      style={{ width: 180, height: 120 }} 
    >
      <Image 
        src="/skill-arena-logo.svg" 
        alt="Skill Arena" 
        fill
        priority 
        className="object-contain"
      />
    </div>
  );

  return (
    <div className="fixed top-0 left-0 z-50 origin-left p-2"> {/* Changed from top-8 left-8 to top-0 left-0 and added small padding */}
      {withLink ? (
        <Link href="/">
          {LogoContent}
        </Link>
      ) : (
        LogoContent
      )}
    </div>
  );
}
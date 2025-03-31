"use client";

import { ReactNode, useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Loader from './Loader';

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
    });

    // Connect GSAP ScrollTrigger with Lenis
    function connectLenisToScrollTrigger(lenis: any) {
      ScrollTrigger.scrollerProxy(document.body, {
        scrollTop(value) {
          if (arguments.length) {
            lenis.scrollTo(value);
          }
          return lenis.scroll;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight
          };
        },
        pinType: document.body.style.transform ? "transform" : "fixed"
      });
    }
    
    connectLenisToScrollTrigger(lenis);
    
    // Update ScrollTrigger when lenis updates
    lenis.on('scroll', ScrollTrigger.update);
    
    // RAF loop for Lenis
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    
    requestAnimationFrame(raf);
    
    // Refresh ScrollTrigger on window resize
    const resizeObserver = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });
    
    resizeObserver.observe(document.body);
    
    // Hide loader after initial load
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 2000); // Adjust this timing as needed
    
    return () => {
      clearTimeout(timer);
      lenis.destroy();
      resizeObserver.disconnect();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  // Store the initial load state in localStorage to persist across navigations
  useEffect(() => {
    if (!isInitialLoad) {
      // Set a flag in sessionStorage that the app has been loaded once
      if (!sessionStorage.getItem('appInitialized')) {
        sessionStorage.setItem('appInitialized', 'true');
      }
    }
  }, [isInitialLoad]);
  
  // Check if this is actually the first load of the session
  useEffect(() => {
    if (sessionStorage.getItem('appInitialized')) {
      setIsInitialLoad(false);
    }
  }, []);

  return (
    <>
      {isInitialLoad ? <Loader /> : null}
      {children}
    </>
  );
}
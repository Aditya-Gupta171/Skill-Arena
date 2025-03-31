"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

type AnimationOptions = {
  opacity?: number;
  y?: number;
  x?: number;
  delay?: number;
  duration?: number;
  ease?: string;
  stagger?: number;
};

export function useGsapAnimation<T extends HTMLElement>(
  shouldAnimate: boolean = true, 
  options: AnimationOptions = {}
) {
  const elementRef = useRef<T>(null);
  
  useEffect(() => {
    if (!shouldAnimate || !elementRef.current) return;
    
    const defaults = {
      opacity: 0,
      y: 30,
      delay: 0,
      duration: 0.8,
      ease: "power3.out",
    };
    
    const animationOptions = { ...defaults, ...options };
    
    gsap.from(elementRef.current, {
      opacity: animationOptions.opacity,
      y: animationOptions.y,
      x: animationOptions.x,
      duration: animationOptions.duration,
      delay: animationOptions.delay,
      ease: animationOptions.ease,
      stagger: animationOptions.stagger,
      scrollTrigger: {
        trigger: elementRef.current,
        start: "top bottom-=100px",
        toggleActions: "play none none none"
      }
    });
    
  }, [shouldAnimate, options]);
  
  return elementRef;
}
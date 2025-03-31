"use client";

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGsapAnimation } from '@/hooks/useGsapAnimation';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroSection() {
  const headingRef = useGsapAnimation<HTMLHeadingElement>();
  const subheadingRef = useGsapAnimation<HTMLParagraphElement>(true, { delay: 0.2 });
  const buttonsRef = useGsapAnimation<HTMLDivElement>(true, { delay: 0.4 });
  const imageContainerRef = useGsapAnimation<HTMLDivElement>(true, { delay: 0.3 });
  
  // Create refs for animations
  const backgroundRef = useRef<HTMLDivElement>(null);
  const shapeRef1 = useRef<HTMLDivElement>(null);
  const shapeRef2 = useRef<HTMLDivElement>(null);
  const shapeRef3 = useRef<HTMLDivElement>(null);
  
  // Store animation instances for cleanup
  const animationsRef = useRef<gsap.core.Tween[]>([]);
  
  useEffect(() => {
    // Clear any existing animations first
    animationsRef.current.forEach(anim => anim.kill());
    animationsRef.current = [];
    
    // Reset ScrollTrigger instances for this component
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.vars.trigger === backgroundRef.current) {
        trigger.kill();
      }
    });
    
    if (!backgroundRef.current) return;
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: backgroundRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
    
    // Enhanced background animation with GSAP
    tl.to(backgroundRef.current, {
      backgroundPosition: "0% 30%",
      ease: "none"
    });
    
    // Animate floating shapes for organic movement
    const shapes = [shapeRef1.current, shapeRef2.current, shapeRef3.current];
    shapes.forEach((shape, i) => {
      if (!shape) return;
      const anim = gsap.to(shape, {
        y: `${(i + 1) * 15}px`,
        rotation: i % 2 === 0 ? 10 : -10,
        duration: 2 + i,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      
      // Store animation for cleanup
      animationsRef.current.push(anim);
    });
    
    // Force ScrollTrigger refresh to ensure proper initialization
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    
    // Clean up all animations and ScrollTrigger instances on unmount
    return () => {
      animationsRef.current.forEach(anim => anim.kill());
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === backgroundRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <main className="pt-32 pb-20 relative overflow-hidden min-h-[100vh] flex items-center">
      {/* Background with warm gradient */}
      <div 
        ref={backgroundRef} 
        className="absolute inset-0 bg-gradient-to-b from-primary/10 to-background bg-[size:200%_200%] bg-[position:0%_0%] z-0"
      >
        {/* Organic decorative shapes with brown palette */}
        <div ref={shapeRef1} className="absolute top-[20%] right-[10%] w-32 h-32 rounded-full bg-accent/20 blur-xl"></div>
        <div ref={shapeRef2} className="absolute bottom-[30%] left-[5%] w-48 h-48 rounded-full bg-primary/15 blur-xl"></div>
        <div ref={shapeRef3} className="absolute top-[40%] left-[20%] w-24 h-24 rounded-full bg-secondary/40 blur-lg"></div>
      </div>
      
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Text content */}
          <div className="flex flex-col space-y-6">
            <h1 
              ref={headingRef} 
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
            >
              Elevate Your Skills at Skill Arena
            </h1>
            
            <p 
              ref={subheadingRef} 
              className="text-lg md:text-xl text-foreground/80 max-w-lg"
            >
              Master in-demand skills with expert-led courses designed for the modern professional. Join thousands of successful students today.
            </p>
            
            <div ref={buttonsRef} className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" asChild>
                <Link href="/courses">Explore Courses</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/free-content">View Free Lessons</Link>
              </Button>
            </div>
            
            {/* Stats with warm color theme */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-border/50 mt-8">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-primary">50+</h3>
                <p className="text-sm text-muted-foreground">Courses</p>
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold text-primary">12k+</h3>
                <p className="text-sm text-muted-foreground">Students</p>
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold text-primary">4.8</h3>
                <p className="text-sm text-muted-foreground">Rating</p>
              </div>
            </div>
          </div>
          
          {/* Right column - Hero image with soft brown backdrop */}
          <div ref={imageContainerRef} className="relative aspect-square max-w-md mx-auto w-full">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-full blur-3xl"></div>
            <div className="relative z-10 w-full h-full p-4">
              <div className="relative w-full h-full rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl bg-muted/30 backdrop-blur">
                <Image
                  src="/images/hero-image.jpg"
                  alt="Skill Arena"
                  fill
                  className="object-cover p-0"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
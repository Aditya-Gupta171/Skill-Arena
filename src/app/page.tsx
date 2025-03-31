import React from 'react';
import HeroSection from '@/components/sections/HeroSection';
import FeaturedCourses from '@/components/sections/FeaturedCourses';
import Testimonials from '@/components/sections/Testimonials';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import CTASection from '@/components/sections/CTASection';

export default function Home() {
  return (
    <main>
      <HeroSection key="hero-section" />
      <FeaturedCourses />
      <Testimonials />
      <WhyChooseUs />
      <CTASection />
    </main>
  );
}
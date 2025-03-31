"use client";

import React from 'react';
import { Container } from "@/components/ui/container";
import { CourseCard, CourseData } from "@/components/ui/course-card";
import { SectionHeader } from "@/components/ui/section-header";
import { BrowseAllButton } from "@/components/ui/browse-all-button";


const courses: CourseData[] = [
  {
    title: "Advanced Data Science",
    description: "Master data analysis, machine learning, and AI with real-world projects and expert guidance.",
    image: "/images/courses/data-science.png",
    price: 129,
    originalPrice: 199,
    badge: "Bestseller",
    students: 4500,
    level: "Intermediate"
  },
  {
    title: "Full-Stack Development",
    description: "Build modern web applications from scratch using the latest technologies and best practices.",
    image:"/images/courses/web-development.png",
    price: 149,
    originalPrice: 249,
    badge: "Popular",
    students: 3200,
    level: "All Levels"
  },
  {
    title: "Digital Marketing Mastery",
    description: "Learn proven strategies to grow businesses online through SEO, social media, and analytics.",
    image: "/images/courses/digital-marketing.jpg",
    price: 99,
    originalPrice: 179,
    badge: "New",
    students: 1800,
    level: "Beginner"
  }
];

export default function FeaturedCourses() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <Container className="max-w-6xl px-4 md:px-6">
        <div className="space-y-16">
          <SectionHeader 
            title="Featured Courses" 
            description="Explore our most popular courses with high student satisfaction rates."
            gradient
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <CourseCard key={index} course={course} index={index} />
            ))}
          </div>
          
          <BrowseAllButton href="/courses" text="Browse All Courses" />
        </div>
      </Container>
    </section>
  );
}
"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export interface CourseData {
  title: string;
  description: string;
  image?: string;
  price?: number;
  originalPrice?: number;
  badge?: string;
  students?: number;
  level?: string;
  slug?: string;
}

interface CourseCardProps {
  course: CourseData;
  index?: number;
}

export function CourseCard({ course, index = 0 }: CourseCardProps) {
  const slug = course.slug || course.title.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col overflow-hidden border-2 border-border/50 shadow-xl hover:shadow-2xl transition-all duration-300 group">
        {course.image && (
          <div className="relative h-52 w-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 z-10 group-hover:opacity-0 transition-opacity duration-300"></div>
            <Image 
              src={course.image} 
              alt={course.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {course.badge && (
              <Badge className="absolute top-4 right-4 z-20 bg-primary text-white px-3 py-1">
                {course.badge}
              </Badge>
            )}
          </div>
        )}
        
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl font-bold">{course.title}</CardTitle>
          </div>
          {(course.level || course.students) && (
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              {course.level && <span>{course.level}</span>}
              {course.level && course.students && <span>•</span>}
              {course.students && <span>{course.students.toLocaleString()} students</span>}
            </div>
          )}
        </CardHeader>
        
        <CardContent className="flex-grow pb-4">
          <CardDescription className="text-base">
            {course.description}
          </CardDescription>
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-3 pt-0 border-t border-border/50 bg-muted/30 p-6">
          {(course.price || course.originalPrice) && (
            <div className="flex justify-between items-center w-full">
              <div className="flex items-end gap-2">
                {course.price && <span className="text-2xl font-bold text-primary">${course.price}</span>}
                {course.originalPrice && (
                  <span className="text-muted-foreground line-through">${course.originalPrice}</span>
                )}
              </div>
              {course.price && course.originalPrice && (
                <div className="text-sm text-muted-foreground">
                  {Math.round((1 - course.price / course.originalPrice) * 100)}% off
                </div>
              )}
            </div>
          )}
          
          <div className="flex gap-3 w-full">
            {course.price ? (
              <>
                <Link href={`/checkout/${slug}`} className="w-full">
                  <Button className="w-full">
                    Buy Now
                  </Button>
                </Link>
                
                <Link href={`/course/${slug}`} className="w-full">
                  <Button variant="outline" className="w-full">
                    Details
                  </Button>
                </Link>
              </>
            ) : (
              <Link href={`/course/${slug}`} className="w-full">
                <Button variant="outline" className="w-full">
                  Learn More
                </Button>
              </Link>
            )}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
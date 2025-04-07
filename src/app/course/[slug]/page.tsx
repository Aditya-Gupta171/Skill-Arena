"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Play, Clock, BookOpen, Award, Users, CheckCircle2 } from "lucide-react";

// This would be fetched from the API in real implementation
const courseData = {
  title: "Advanced Data Science",
  description: "Master data analysis, machine learning, and AI with real-world projects and expert guidance.",
  longDescription: "This comprehensive course takes you from the fundamentals of data analysis to advanced machine learning techniques. You'll learn to work with real-world datasets, build predictive models, and deploy AI solutions that drive business value.",
  image: "/images/courses/data-science.png",
  price: 129,
  originalPrice: 199,
  badge: "Bestseller",
  students: 4500,
  level: "Intermediate",
  duration: "20 hours",
  lessons: 42,
  instructor: {
    name: "Dr. Sarah Johnson",
    bio: "Data Science Lead at TechCorp with 15+ years of industry experience",
    avatar: "/images/instructors/sarah.jpg"
  },
  whatYouWillLearn: [
    "Build end-to-end machine learning pipelines",
    "Implement advanced neural networks with TensorFlow",
    "Clean and preprocess complex datasets",
    "Deploy models to production environments",
    "Perform feature engineering for better model performance",
    "Apply statistical analysis to interpret results"
  ],
  curriculum: [
    {
      title: "Introduction to Data Science",
      lessons: [
        { title: "Course Overview", duration: "10:00" },
        { title: "Setting Up Your Environment", duration: "15:30" },
        { title: "Understanding Data Types", duration: "12:45" }
      ]
    },
    {
      title: "Data Analysis Fundamentals",
      lessons: [
        { title: "Exploratory Data Analysis", duration: "22:15" },
        { title: "Statistical Methods", duration: "18:30" },
        { title: "Data Visualization", duration: "25:00" }
      ]
    }
  ]
};

export default function CourseDetail({ params }: { params: { slug: string } }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <main className="pt-32 pb-20">
      <Container>
        <div className="grid md:grid-cols-3 gap-12">
          {/* Left Column - Course Info */}
          <div className="md:col-span-2 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-4">{courseData.level}</Badge>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{courseData.title}</h1>
              
              <p className="text-muted-foreground text-lg mb-6">{courseData.description}</p>
              
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-1">
                  <Users size={16} />
                  <span>{courseData.students.toLocaleString()} students</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={16} />
                  <span>{courseData.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen size={16} />
                  <span>{courseData.lessons} lessons</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3 mb-8">
                <Image 
                  src={courseData.instructor.avatar} 
                  alt={courseData.instructor.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <p className="font-medium">{courseData.instructor.name}</p>
                  <p className="text-sm text-muted-foreground">{courseData.instructor.bio}</p>
                </div>
              </div>
            </motion.div>

            <Tabs defaultValue="overview">
              <TabsList className="mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-4">About This Course</h3>
                  <p className={`text-muted-foreground ${!isExpanded && "line-clamp-3"}`}>
                    {courseData.longDescription}
                  </p>
                  <Button 
                    variant="link" 
                    onClick={() => setIsExpanded(!isExpanded)} 
                    className="p-0 mt-2"
                  >
                    {isExpanded ? "Show less" : "Show more"}
                  </Button>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-4">What You'll Learn</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {courseData.whatYouWillLearn.map((item, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle2 size={18} className="text-primary mt-1" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="curriculum">
                <h3 className="text-xl font-bold mb-4">Course Content</h3>
                <div className="space-y-4">
                  {courseData.curriculum.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="border rounded-lg overflow-hidden">
                      <div className="bg-muted/50 p-4 font-medium">
                        {section.title}
                      </div>
                      <div className="divide-y">
                        {section.lessons.map((lesson, lessonIndex) => (
                          <div key={lessonIndex} className="p-4 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <Play size={16} />
                              <span>{lesson.title}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="instructor">
                <h3 className="text-xl font-bold mb-4">Meet Your Instructor</h3>
                <div className="flex items-start gap-4">
                  <Image 
                    src={courseData.instructor.avatar} 
                    alt={courseData.instructor.name}
                    width={100}
                    height={100}
                    className="rounded-full"
                  />
                  <div>
                    <h4 className="text-lg font-medium">{courseData.instructor.name}</h4>
                    <p className="text-muted-foreground">{courseData.instructor.bio}</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews">
                <h3 className="text-xl font-bold mb-4">Student Reviews</h3>
                <p className="text-muted-foreground">Reviews will be displayed here.</p>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Right Column - Purchase Card */}
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="sticky top-32"
            >
              <div className="border rounded-lg overflow-hidden shadow-lg">
                <div className="relative aspect-video">
                  <Image 
                    src={courseData.image} 
                    alt={courseData.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Button size="icon" className="rounded-full w-16 h-16">
                      <Play size={24} />
                    </Button>
                  </div>
                </div>
                
                <div className="p-6 space-y-6">
                  <div className="flex justify-between items-end">
                    <div className="flex items-end gap-2">
                      <span className="text-3xl font-bold">${courseData.price}</span>
                      {courseData.originalPrice && (
                        <span className="text-lg text-muted-foreground line-through">
                          ${courseData.originalPrice}
                        </span>
                      )}
                    </div>
                    {courseData.price && courseData.originalPrice && (
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary">
                        {Math.round((1 - courseData.price / courseData.originalPrice) * 100)}% off
                      </Badge>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <Button className="w-full text-lg py-6">Enroll Now</Button>
                    <p className="text-center text-sm text-muted-foreground">
                      30-Day Money-Back Guarantee
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium">This course includes:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm">
                        <Video size={16} />
                        <span>{courseData.duration} on-demand video</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <FileText size={16} />
                        <span>12 downloadable resources</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <Clock size={16} />
                        <span>Full lifetime access</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <Smartphone size={16} />
                        <span>Access on mobile and TV</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <Award size={16} />
                        <span>Certificate of completion</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </main>
  );
}

// This is a client component but would need these imports
import { Video, FileText, Smartphone } from "lucide-react";
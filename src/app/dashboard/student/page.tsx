"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

// Mock data
const enrolledCourses = [
  {
    id: 1,
    title: "Advanced Data Science",
    image: "/images/courses/data-science.png",
    instructor: "Dr. Sarah Johnson",
    progress: 65,
    lastAccessed: "2023-04-01T14:30:00"
  },
  {
    id: 2,
    title: "Full-Stack Development",
    image: "/images/courses/web-development.png",
    instructor: "Michael Chen",
    progress: 32,
    lastAccessed: "2023-04-02T10:15:00"
  }
];

const certificates = [
  {
    id: 1,
    title: "Introduction to Python",
    issueDate: "2023-02-15",
    image: "/images/certificates/python.jpg"
  }
];

export default function StudentDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <main className="pt-32 pb-20">
      <Container>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center text-2xl font-bold text-primary">
                JD
              </div>
              <div>
                <h2 className="font-medium">John Doe</h2>
                <p className="text-sm text-muted-foreground">Student</p>
              </div>
            </div>
            
            <div className="space-y-1">
              <Link href="/dashboard/student" className="block py-2 px-3 bg-primary/10 text-primary rounded-md">
                My Learning
              </Link>
              <Link href="/dashboard/student/wishlist" className="block py-2 px-3 text-foreground hover:bg-muted/50 rounded-md">
                Wishlist
              </Link>
              <Link href="/dashboard/student/purchases" className="block py-2 px-3 text-foreground hover:bg-muted/50 rounded-md">
                Purchase History
              </Link>
              <Link href="/dashboard/student/certificates" className="block py-2 px-3 text-foreground hover:bg-muted/50 rounded-md">
                Certificates
              </Link>
              <Link href="/dashboard/student/profile" className="block py-2 px-3 text-foreground hover:bg-muted/50 rounded-md">
                Profile Settings
              </Link>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">My Learning</h1>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                <input 
                  type="text" 
                  placeholder="Search your courses" 
                  className="pl-10 pr-4 py-2 rounded-full border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <Tabs defaultValue="in-progress">
              <TabsList className="mb-6">
                <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="archived">Archived</TabsTrigger>
              </TabsList>
              
              <TabsContent value="in-progress" className="space-y-6">
                {enrolledCourses.map(course => (
                  <Card key={course.id} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="relative h-48 md:h-auto md:w-64">
                        <Image 
                          src={course.image} 
                          alt={course.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 p-6">
                        <CardTitle className="mb-2">{course.title}</CardTitle>
                        <CardDescription className="mb-4">Instructor: {course.instructor}</CardDescription>
                        
                        <div className="mb-4">
                          <div className="flex justify-between mb-2">
                            <span className="text-sm">{course.progress}% complete</span>
                            <span className="text-sm text-muted-foreground">
                              Last accessed: {new Date(course.lastAccessed).toLocaleDateString()}
                            </span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>
                        
                        <Button asChild>
                          <Link href={`/learning/${course.id}`}>Continue Learning</Link>
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="completed" className="space-y-6">
                <p className="text-muted-foreground">You haven't completed any courses yet.</p>
              </TabsContent>
              
              <TabsContent value="archived" className="space-y-6">
                <p className="text-muted-foreground">You don't have any archived courses.</p>
              </TabsContent>
            </Tabs>
            
            <div className="mt-12">
              <h2 className="text-xl font-bold mb-6">My Certificates</h2>
              
              {certificates.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {certificates.map(certificate => (
                    <Card key={certificate.id} className="overflow-hidden">
                      <div className="relative h-40">
                        <Image 
                          src={certificate.image} 
                          alt={certificate.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <CardTitle className="text-base">{certificate.title}</CardTitle>
                        <CardDescription>
                          Issued on {new Date(certificate.issueDate).toLocaleDateString()}
                        </CardDescription>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Button variant="outline" size="sm" className="w-full">
                          Download
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">You haven't earned any certificates yet.</p>
              )}
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
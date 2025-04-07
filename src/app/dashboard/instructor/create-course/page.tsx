"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Plus, Trash2, ArrowLeft, Upload, DollarSign, X, Move } from "lucide-react";

export default function CreateCourse() {
  const [sections, setSections] = useState([{ title: "Section 1", lessons: [{ title: "", type: "video" }] }]);
  
  const addSection = () => {
    setSections([...sections, { 
      title: `Section ${sections.length + 1}`,
      lessons: [{ title: "", type: "video" }]
    }]);
  };
  
  const addLesson = (sectionIndex: number) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].lessons.push({ title: "", type: "video" });
    setSections(updatedSections);
  };
  
  const removeLesson = (sectionIndex: number, lessonIndex: number) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].lessons.splice(lessonIndex, 1);
    setSections(updatedSections);
  };
  
  const removeSection = (sectionIndex: number) => {
    const updatedSections = [...sections];
    updatedSections.splice(sectionIndex, 1);
    setSections(updatedSections);
  };
  
  return (
    <main className="pt-32 pb-20">
      <Container>
        <div className="mb-8">
          <Link 
            href="/dashboard/instructor" 
            className="flex items-center text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Dashboard
          </Link>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-6">Create New Course</h1>
          
          <Tabs defaultValue="basic">
            <TabsList className="mb-8 w-full max-w-md dashboard-tabs">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
              <TabsTrigger value="publish">Publish</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic">
              <Card>
                <CardHeader>
                  <CardTitle>Course Details</CardTitle>
                  <CardDescription>
                    Add the basic information about your course
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Course Title</Label>
                    <Input id="title" placeholder="e.g. Advanced Data Science with Python" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Short Description</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Brief description of your course (150-200 characters)"
                      className="resize-none"
                      rows={3}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="full-description">Full Description</Label>
                    <Textarea 
                      id="full-description" 
                      placeholder="Detailed description of your course content, objectives, and outcomes"
                      rows={6}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="development">Development</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                          <SelectItem value="design">Design</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="data-science">Data Science</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="level">Level</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                          <SelectItem value="all-levels">All Levels</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Course Thumbnail</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                      <div className="space-y-4">
                        <div className="mx-auto w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center">
                          <Upload size={20} className="text-muted-foreground" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            Click to upload or drag and drop
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            SVG, PNG, JPG or GIF (Max. 2MB)
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Select File
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 flex justify-end">
                    <Button>Save & Continue</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="curriculum">
              <Card>
                <CardHeader>
                  <CardTitle>Course Curriculum</CardTitle>
                  <CardDescription>
                    Create your course structure with sections and lessons
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {sections.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="border rounded-lg overflow-hidden">
                      <div className="bg-muted/50 p-4">
                        <div className="flex items-center justify-between">
                          <Input 
                            value={section.title}
                            onChange={(e) => {
                              const updatedSections = [...sections];
                              updatedSections[sectionIndex].title = e.target.value;
                              setSections(updatedSections);
                            }}
                            className="max-w-md"
                          />
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => removeSection(sectionIndex)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-4 space-y-3">
                        {section.lessons.map((lesson, lessonIndex) => (
                          <div key={lessonIndex} className="flex items-center gap-3">
                            <div className="p-2 bg-muted/30 rounded">
                              <Move size={16} className="text-muted-foreground" />
                            </div>
                            
                            <div className="flex-1">
                              <Input 
                                placeholder="Lesson title"
                                value={lesson.title}
                                onChange={(e) => {
                                  const updatedSections = [...sections];
                                  updatedSections[sectionIndex].lessons[lessonIndex].title = e.target.value;
                                  setSections(updatedSections);
                                }}
                              />
                            </div>
                            
                            <Select
                              value={lesson.type}
                              onValueChange={(value) => {
                                const updatedSections = [...sections];
                                updatedSections[sectionIndex].lessons[lessonIndex].type = value;
                                setSections(updatedSections);
                              }}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="video">Video</SelectItem>
                                <SelectItem value="quiz">Quiz</SelectItem>
                                <SelectItem value="assignment">Assignment</SelectItem>
                                <SelectItem value="text">Text</SelectItem>
                              </SelectContent>
                            </Select>
                            
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => removeLesson(sectionIndex, lessonIndex)}
                            >
                              <X size={16} />
                            </Button>
                          </div>
                        ))}
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => addLesson(sectionIndex)}
                          className="mt-3"
                        >
                          <Plus size={16} className="mr-2" />
                          Add Lesson
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  <Button variant="outline" onClick={addSection}>
                    <Plus size={16} className="mr-2" />
                    Add Section
                  </Button>
                  
                  <div className="pt-4 flex justify-end">
                    <Button>Save & Continue</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="pricing">
              <Card>
                <CardHeader>
                  <CardTitle>Course Pricing</CardTitle>
                  <CardDescription>
                    Set the price for your course
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (USD)</Label>
                    <div className="relative">
                      <DollarSign size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                      <Input id="price" type="number" className="pl-8" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="original-price">Original Price (for discounts)</Label>
                      <span className="text-xs text-muted-foreground">Optional</span>
                    </div>
                    <div className="relative">
                      <DollarSign size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                      <Input id="original-price" type="number" className="pl-8" />
                    </div>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg mt-6">
                    <div className="font-medium mb-2">Earnings Calculation</div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div className="flex justify-between">
                        <span>Your Price:</span>
                        <span>$99.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Platform Fee (15%):</span>
                        <span>-$14.85</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Transaction Fee (3%):</span>
                        <span>-$2.97</span>
                      </div>
                      <div className="flex justify-between font-medium pt-2 border-t">
                        <span>Your Earnings Per Sale:</span>
                        <span>$81.18</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 flex justify-end">
                    <Button>Save & Continue</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="publish">
              <Card>
                <CardHeader>
                  <CardTitle>Review & Publish</CardTitle>
                  <CardDescription>
                    Review your course details before publishing
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Course Preview</h3>
                    <div className="border rounded-lg p-6 space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="w-32 h-20 bg-muted rounded"></div>
                        <div>
                          <h4 className="font-bold">Advanced Data Science with Python</h4>
                          <p className="text-sm text-muted-foreground">
                            Master data analysis, machine learning, and AI with real-world projects...
                          </p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Category:</span> Data Science
                        </div>
                        <div>
                          <span className="text-muted-foreground">Level:</span> Intermediate
                        </div>
                        <div>
                          <span className="text-muted-foreground">Price:</span> $99.00
                        </div>
                        <div>
                          <span className="text-muted-foreground">Sections:</span> 2
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="publish-as">Publish As</Label>
                    <Select defaultValue="draft">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft (only visible to you)</SelectItem>
                        <SelectItem value="review">Submit for Review</SelectItem>
                        <SelectItem value="public">Public (if approved)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="pt-6 flex justify-end gap-4">
                    <Button variant="outline">Save as Draft</Button>
                    <Button>Submit for Review</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </Container>
    </main>
  );
}
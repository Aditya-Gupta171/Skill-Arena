"use client";

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Data Analyst at Tech Co",
    content: "The Advanced Data Science course helped me transition from a junior analyst to a senior role. The projects were challenging but incredibly rewarding."
  },
  {
    name: "Michael Chen",
    role: "Frontend Developer",
    content: "I landed my dream job after completing the Full-Stack Development course. The instructors were supportive and the content was cutting-edge."
  }
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-background">
      <Container className="max-w-6xl px-4 md:px-6">
        <div className="space-y-12">
          <motion.div 
            className="text-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
              What Our Students Say
            </h2>
            <p className="text-muted-foreground max-w-[700px] mx-auto">
              Join thousands of successful students who have transformed their careers with our courses.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-muted/30 h-full">
                  <CardContent className="pt-6">
                    <p className="italic mb-4">"{testimonial.content}"</p>
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-muted-foreground text-sm">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
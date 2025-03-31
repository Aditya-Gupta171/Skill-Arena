"use client";

import React from 'react';
import { Container } from "@/components/ui/container";
import { motion } from "framer-motion";

const features = [
  {
    title: "Expert Instructors",
    description: "Learn from industry professionals with years of real-world experience."
  },
  {
    title: "Flexible Learning",
    description: "Study at your own pace with lifetime access to course materials."
  },
  {
    title: "Project-Based",
    description: "Apply your knowledge through practical projects that build your portfolio."
  },
  {
    title: "Career Support",
    description: "Get guidance on job applications, interviews, and career advancement."
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-muted/50">
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
              Why Choose Our Courses
            </h2>
            <p className="text-muted-foreground max-w-[700px] mx-auto">
              We're committed to providing the highest quality educational experience.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                className="text-center space-y-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <h3 className="font-bold text-lg">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <Container className="max-w-5xl px-4 md:px-6">
        <motion.div 
          className="flex flex-col items-center text-center space-y-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
              Ready to Advance Your Career?
            </h2>
            <p className="text-xl opacity-90 max-w-[600px] mx-auto">
              Join our learning community and gain the skills you need to succeed in today's competitive job market.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-[#C19A6B] hover:bg-[#9D7E5D] text-white border-none" 
              asChild
            >
              <Link href="/signup">Start Learning Today</Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-transparent border-white hover:bg-white/10 text-white hover:text-white" 
              asChild
            >
              <Link href="/contact">Talk to an Advisor</Link>
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
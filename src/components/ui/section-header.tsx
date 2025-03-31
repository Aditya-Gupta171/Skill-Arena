"use client";

import React from 'react';
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  description?: string;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  gradient?: boolean;
}

export function SectionHeader({ 
  title, 
  description, 
  className, 
  titleClassName,
  descriptionClassName,
  gradient = false
}: SectionHeaderProps) {
  return (
    <motion.div 
      className={cn("text-center space-y-4", className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className={cn(
        "text-3xl md:text-5xl font-bold tracking-tighter",
        gradient ? "bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent" : "",
        titleClassName
      )}>
        {title}
      </h2>
      
      {description && (
        <p className={cn(
          "text-muted-foreground text-lg max-w-[700px] mx-auto",
          descriptionClassName
        )}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
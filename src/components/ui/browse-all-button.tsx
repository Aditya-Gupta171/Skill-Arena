import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

interface BrowseAllButtonProps {
  href: string;
  text?: string;
  className?: string;
}

export function BrowseAllButton({ 
  href, 
  text = "Browse All", 
  className 
}: BrowseAllButtonProps) {
  return (
    <div className="text-center pt-8">
      <motion.div
        className="btn-motion-wrapper inline-block"
        whileHover={{ 
          scale: 1.02,
          boxShadow: "0 10px 15px -3px rgba(101, 70, 45, 0.2), 0 4px 6px -4px rgba(101, 70, 45, 0.2)" 
        }}
        whileTap={{ scale: 0.98 }}
        transition={{ 
          type: "spring", 
          stiffness: 400, 
          damping: 17 
        }}
      >
        <Button 
          variant="outline" 
          size="lg"
          className={className}
          asChild
        >
          <Link href={href}>
            {text}
          </Link>
        </Button>
      </motion.div>
    </div>
  );
}
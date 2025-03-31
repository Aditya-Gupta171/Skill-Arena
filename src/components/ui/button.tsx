'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[#9D7E5D] text-white hover:bg-[#513C29] hover:text-white hover:shadow-md",
        destructive: "bg-destructive text-white hover:bg-destructive/90 hover:text-white",
        outline: "border border-[#9D7E5D] text-[#9D7E5D] hover:bg-[#513C29] hover:text-white hover:shadow-sm",
        secondary: "bg-secondary text-white hover:bg-[#513C29] hover:text-white hover:shadow-sm",
        ghost: "text-[#9D7E5D] hover:bg-[#513C29] hover:text-white",
        link: "text-[#9D7E5D] font-medium underline-offset-4 hover:underline hover:text-[#513C29] font-semibold",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    if (asChild) {
      return (
        <Slot
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        />
      );
    }

    return (
      <motion.button 
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
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
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
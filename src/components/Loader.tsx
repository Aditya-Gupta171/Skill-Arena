"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function Loader() {
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [showLoader, setShowLoader] = useState(true);
  const pathname = usePathname();

  // Use sessionStorage to track if this is the first visit in this session
  useEffect(() => {
    // Check if this is the first load of the website in this session
    const hasVisitedBefore = sessionStorage.getItem('hasVisited');
    
    if (hasVisitedBefore) {
      // If user has visited before in this session, don't show loader
      setIsFirstLoad(false);
      setShowLoader(false);
    } else {
      // Mark as visited for future navigation
      sessionStorage.setItem('hasVisited', 'true');
      
      // Show loader for 2 seconds on first visit only
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  // If not first load or loader already finished, don't render anything
  if (!isFirstLoad || !showLoader) {
    return null;
  }

  return (
    <AnimatePresence>
      {showLoader && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="w-32 h-32 mx-auto mb-8">
              {/* Your logo or loader animation here */}
              <img src="/skill-arena-logo.svg" alt="Loading" className="w-full h-full" />
            </div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="h-1 bg-primary max-w-[200px] mx-auto rounded-full"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
'use client';

import { useEffect, useState } from 'react';

export default function ClientBody({ 
  children,
  className
}: { 
  children: React.ReactNode;
  className: string;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Remove the VSCode-specific class that causes hydration mismatch
    const body = document.querySelector('body');
    if (body && body.classList.contains('vsc-initialized')) {
      body.classList.remove('vsc-initialized');
    }
  }, []);

  return (
    <body className={className} suppressHydrationWarning>
      {children}
    </body>
  );
}
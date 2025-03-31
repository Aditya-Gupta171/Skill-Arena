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
    document.body.classList.remove('vsc-initialized');
  }, []);

  if (!mounted) {
    return <body className={className}>{children}</body>;
  }

  return <body className={className}>{children}</body>;
}
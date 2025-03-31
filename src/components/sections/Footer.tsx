"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";

export default function Footer() {
  return (
    <footer className="bg-muted/50 py-16">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Column 1: Logo and brief description */}
          <div className="md:col-span-1">
            <div className="relative w-40 h-14 mb-4">
              {/* Don't wrap Logo in Link since Logo already has a Link */}
              <Logo withLink={false} />
            </div>
            <p className="text-muted-foreground text-sm mt-4">
              Elevate your skills with expert-led courses designed for the modern professional.
            </p>
          </div>
          
          {/* Column 2: About */}
          <div>
            <h3 className="font-semibold text-base mb-4">About</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Our Team
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Press
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 3: Contact */}
          <div>
            <h3 className="font-semibold text-base mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Support
                </Link>
              </li>
              <li>
                <a href="mailto:hello@skillarena.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  hello@skillarena.com
                </a>
              </li>
              <li>
                <a href="tel:+11234567890" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  +1 (123) 456-7890
                </a>
              </li>
            </ul>
          </div>
          
          {/* Column 4: Legal */}
          <div>
            <h3 className="font-semibold text-base mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border/50 mt-12 pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Skill Arena. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
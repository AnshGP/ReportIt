"use client";
import Link from "next/link";
import { useState } from "react";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full border-b border-white/5 bg-black/60 backdrop-blur-xl z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between h-auto py-3">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center space-x-3">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center">
                  <svg
                    className="h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <span className="text-lg italic font-semibold text-white">
                  ReportIt!
                </span>
              </Link>
            </div>

            {/* Links (tablet & desktop) */}
            <div className="hidden sm:flex flex-wrap items-center gap-x-6 gap-y-2 mt-3 sm:mt-0">
              <Link
                href="/submit-report"
                className="text-base text-zinc-400 hover:text-white transition-colors"
              >
                Submit Report
              </Link>
              <Link
                href="/track-report"
                className="text-base text-zinc-400 hover:text-white transition-colors"
              >
                Track Report
              </Link>
              <Link
                href="/how-it-works"
                className="text-base text-zinc-400 hover:text-white transition-colors"
              >
                How It Works
              </Link>
              <Link
                href="/contact"
                className="text-base text-zinc-400 hover:text-white transition-colors"
              >
                Contact
              </Link>
            </div>

            {/* Emergency + Mobile menu button */}
            <div className="flex items-center space-x-4 mt-3 sm:mt-0">
              <div className="group flex h-9 items-center gap-2 rounded-full bg-red-500/10 pl-4 pr-5 text-sm font-medium text-red-500 ring-1 ring-inset ring-red-500/20 transition-all hover:bg-red-500/20">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                Emergency: 100
              </div>

              {/* Hamburger for mobile */}
              <button
                className="sm:hidden p-2 text-zinc-400 hover:text-white"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}

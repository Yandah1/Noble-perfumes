import React from 'react';
import Link from 'next/link';

export default function Footer() {
  // Get current year
  const currentYear = new Date().getFullYear();

  return (
    <div className="border-t border-gray-400">
      <div className="h-6 my-5">
        <div className="flex gap-3 justify-center">
          <Link href="/terms">
            About the Developers
          </Link>
          |
          <Link href="/privacy">
            Contact Us
          </Link>
          |
          <span>&copy; {currentYear} Noble Perfumes</span>
        </div>
      </div>
    </div>
  );
}
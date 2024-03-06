"use client"
import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <div className="border-t border-gray-400">
      <div className="h-6 my-5">
        <div className="flex gap-3 justify-center">
          <Link href="/terms">
            Terms of Service
          </Link>
          |
          <Link href="/privacy">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
}

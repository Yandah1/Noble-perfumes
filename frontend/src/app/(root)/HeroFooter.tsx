import React from 'react';
import Link from 'next/link';
import { Button } from 'antd';

export default function Footer() {
  // Get current year
  const currentYear = new Date().getFullYear();

  return (
    <div className="border-t border-gray-400" style={{color: "#22d3ee"}} >
      <div className="h-6 my-5">
        <div className="flex gap-3 justify-center ">
          <Button type='link'>
            <Link href="/about">
              About the Developers
            </Link>
          </Button>
          |
          <Button type='link'>
            <Link href="/aboutus">
              About Us
            </Link>
          </Button>
          |
          <span>&copy; {currentYear} Noble Perfumes</span>
        </div>
      </div>
    </div>
  );
}
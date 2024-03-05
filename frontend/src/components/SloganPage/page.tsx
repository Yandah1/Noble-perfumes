import React from "react";
import { FacebookOutlined, TwitterOutlined, WhatsAppOutlined } from '@ant-design/icons';
import Link from "next/link";

interface SloganPageProps {
    text?: string;
}

const SloganPage: React.FC<SloganPageProps> = ({ text }) => {
    
    return (
        <div className="min-w-xl lg:max-w-xl py-10 h-1/2 bg-opacity-10 bg-white rounded-md mx-1 shadow-md flex items-center">
            <div className="flex flex-col items-center text-center">
                <p className="text-2xl md:text-4xl lg:text-5xl font-bold">{text}</p>
                <div className="space-x-4 text-3xl p-5 max-w-[220px]">
                    <Link href="#"><TwitterOutlined /></Link>
                    <Link href="#"><FacebookOutlined /></Link>
                    <Link href="#"><WhatsAppOutlined /></Link>
                </div>
            </div>
      </div>
    );
}

// Set default value for the text prop
SloganPage.defaultProps = {
    text: "Elevate your scents, Embrace the noble Essence",
}

export default SloganPage;
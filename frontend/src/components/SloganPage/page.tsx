import React from "react";
import { FacebookOutlined, TwitterOutlined, WhatsAppOutlined } from '@ant-design/icons';
import Link from "next/link";

interface SloganPageProps {
    text?: string;
}

const SloganPage: React.FC<SloganPageProps> = ({ text }) => {
    
    return (
        <>
            <div className="min-w-sm md:min-w-xl xl:max-w-xl py-5 lg:py-10 h-25 lg:h-60 bg-opacity-10 bg-white rounded-md mx-1 shadow-md flex items-center">
                <div className="flex flex-col items-center min-w-full">
                    <p className="text-center p-2 xl:p-5 text-2xl xl:text-3xl font-bold">{text}</p>
                    <div className="space-x-4 text-3xl p-2 lg:max-w-[220px] text-nowrap">
                        <Link href="#"><TwitterOutlined /></Link>
                        <Link href="#"><FacebookOutlined /></Link>
                        <Link href="#"><WhatsAppOutlined /></Link>
                    </div>
                </div>
            </div>
            <div className='text-center mx-auto p-5 m-2'>
                <Link href={'/about'}>About Us</Link>
            </div>
        </>
    );
}

// Set default value for the text prop
SloganPage.defaultProps = {
    text: "Elevate your scents, Embrace the noble Essence",
}

export default SloganPage;
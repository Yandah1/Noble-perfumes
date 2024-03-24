"use client"
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Providers, { persistor } from "@/redux/Providers";
import { ConfigProvider } from "antd";
import theme from "@/theme/themeConfig";
import { PersistGate } from "redux-persist/integration/react";
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ConfigProvider theme={theme}>
        <body style={{minWidth: 658}} className="px-5">
        <AntdRegistry>
            <Providers>
            <PersistGate loading={null} persistor={persistor}>
              {children}
            </PersistGate>
            </Providers>
          </AntdRegistry>
        </body>
      </ConfigProvider>
    </html>
  );
}

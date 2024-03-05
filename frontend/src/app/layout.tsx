import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Providers from "@/redux/Providers";
import { ConfigProvider } from "antd";
import theme from "@/theme/themeConfig";

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500"]
});

export const metadata: Metadata = {
  title: "Noble Perfumes",
  description: "Perfumes sales e-commerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ConfigProvider theme={theme}>
        <body className={`${poppins.className} px-5`}>
        <AntdRegistry>
            <Providers>
              {children}
            </Providers>
          </AntdRegistry>
        </body>
      </ConfigProvider>
    </html>
  );
}

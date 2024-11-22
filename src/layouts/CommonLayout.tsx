import React, { Suspense } from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import { geistvf } from "@/styles/font";
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";

const CommonLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en" className={` ${geistvf.variable}`}>
    <body
      className={`w-full font-geistvf antialiased`}
      suppressHydrationWarning
    >
      <AntdRegistry>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#00b96b",
              borderRadius: 2,
            },
          }}
        >
          <Suspense
            fallback={
              <div className="flex h-screen w-screen items-center justify-center">
                <Image
                  className="animate-bounce"
                  src={"/logos/logo.svg"}
                  alt={""}
                  width={100}
                  height={100}
                />
              </div>
            }
          >
            {children}
          </Suspense>
        </ConfigProvider>
      </AntdRegistry>
    </body>
  </html>
);

export default CommonLayout;

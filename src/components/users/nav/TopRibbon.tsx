"use client";
import { PhoneOutlined } from "@ant-design/icons";
import { theme } from "antd";
import React from "react";
export const TopRibbon: React.FC = () => {
  const {
    token: { colorPrimary },
  } = theme.useToken();
  return (
    <div
      className="hidden h-[40px] w-full items-center justify-between px-12 text-sm text-white md:flex"
      style={{ backgroundColor: colorPrimary }}
    >
      <span className="flex w-1/3 items-center gap-2 text-left">
        <PhoneOutlined /> (123) 458-1245 Round the clock free hotline (24/7)
      </span>
      <span className="w-1/3 text-center">10% off new weekly deal</span>
      <span className="flex w-1/3 items-center justify-end gap-2 text-right">
        <a href="#">About Us</a>
        <a href="#">Contact</a>
      </span>
    </div>
  );
};

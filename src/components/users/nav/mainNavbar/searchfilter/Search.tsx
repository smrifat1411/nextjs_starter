"use client";
import Image from "next/image";

import { Filter } from "./Filter";
import AppInput from "@/components/common/custom-inputs/AppInput";

export const Search = () => {
  return (
    <div className="relative bg-transparent text-gray-500">
      <div className="absolute flex h-full items-center px-2">
        <Image
          src={"/icons/MagnifyingGlass.svg"}
          alt={"Search Icon"}
          className="h-[18px] w-[18px]"
          width={100}
          height={100}
        />
      </div>
      <AppInput
        placeholder="Search for product, rental, themes"
        className="!w-full !font-proxima text-[0.7rem] md:!w-[500px]"
        style={{
          height: "40px",
          backgroundColor: "transparent",
          paddingLeft: "30px",
          fontSize: "16px",
        }}
      />
      <div className="absolute right-0 top-0 flex h-full items-center px-2">
        {/* <Filter /> */}
      </div>
    </div>
  );
};

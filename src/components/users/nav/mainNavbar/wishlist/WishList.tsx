import React from "react";
import Image from "next/image";
import CustomTooltip from "@/components/common/CustomTooltip"; // Import the custom tooltip
const Wishlist = () => {
  return (
    <div className="cursor-pointer">
      <CustomTooltip
        content={
          <div className="flex w-[150px] items-center gap-2">
            {/* Wishlist Preview Image */}
            <div className="h-12 w-12 border">
              <Image
                src={"/pictures/placeholder.png"}
                alt={"Wishlist Placeholder"}
                width={100}
                height={100}
              />
            </div>
            {/* Wishlist Text */}
            <div className="flex flex-col">
              <span>Saved To</span>
              <span className="text-lg font-semibold">Wishlist</span>
            </div>
          </div>
        }
      >
        {/* Wishlist Icon */}
        <Image
          src={"/icons/Heart.svg"}
          alt={"Heart Icon"}
          className="h-[24px] w-[24px]"
          width={100}
          height={100}
        />
      </CustomTooltip>
    </div>
  );
};

export default Wishlist;

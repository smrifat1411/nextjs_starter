"use client";
import { Tooltip } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import { Search } from "./searchfilter";
import { Cart } from "./cart";
import Wishlist from "./wishlist/WishList";
import ProfileSection from "./ProfileSection";
import Login from "@/components/auth/Login";

export const MainNavbar: React.FC = () => {
  // State to manage the mobile menu open/close state
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // State to manage the login modal visibility
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Handler to open the login modal
  const handleProfileClick = () => {
    setIsLoginModalOpen(true);
  };

  // Handler to close the login modal
  const handleLoginModalClose = () => {
    setIsLoginModalOpen(false);
  };

  // Dummy handler for login form submission
  // const handleLoginSubmit = (email: string) => {
  //   console.log("Logging in with email:", email);
  //   setIsLoginModalOpen(false); // Close the modal after login
  // };

  return (
    <div className="flex h-[80px] w-full items-center justify-between border-b border-gray-200 bg-white p-4 text-sm md:px-12">
      {/* Left Section: Logo and Search */}
      <div className="flex h-full items-center gap-4 md:gap-8">
        {/* Mobile Menu Icon and Logo */}
        <div className="block cursor-pointer md:hidden">
          <div className="flex flex-row items-center gap-4">
            {/* Burger Menu Icon */}
            <Image
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              src={"/icons/Burger.svg"}
              alt={"Burger Menu Icon"}
              className="h-[24px] w-[24px]"
              width={100}
              height={100}
            />
            {/* Mobile Logo */}
            <Image
              src={"/logos/logo.svg"}
              alt={"Main Logo"}
              className="h-[41px] w-[95px] cursor-pointer"
              width={100}
              height={100}
            />
          </div>
        </div>
        {/* Desktop Logo */}
        <div className="hidden md:block">
          <Image
            src={"/logos/logo.svg"}
            className="h-[53px] w-[125px] cursor-pointer"
            alt={"Main Logo"}
            width={100}
            height={100}
          />
        </div>
        {/* Mini Banner for Desktop */}
        <div className="hidden md:block">
          <Image
            src={"/logos/minibanner.svg"}
            alt={"Mini Banner"}
            className="h-[37px] w-[199px]"
            width={100}
            height={100}
          />
        </div>
        {/* Search Component (Visible on Desktop) */}
        <div className="hidden md:block">
          <Search />
        </div>
      </div>

      {/* Right Section: Wishlist, Cart, and Profile */}
      <div className="flex h-full items-center gap-4 md:gap-6">
        {/* Mobile Search Placeholder */}
        <div className="block cursor-pointer md:hidden">
          {/* Placeholder for mobile search */}
        </div>

        {/* Profile Section */}
        <div className="flex h-full items-center gap-4 md:gap-6">
          {/* Profile Icon - Opens Login Modal */}
          <div onClick={handleProfileClick} className="cursor-pointer">
            <ProfileSection />
          </div>
        </div>

        {/* Add to Wishlist Section */}
        <Wishlist />

        {/* Add to Cart Section */}
        <div className="cursor-pointer">
          <Tooltip
            placement="bottom"
            overlay={
              <div className="flex w-[250px] items-center gap-2 p-2">
                {/* Cart Preview Image */}
                <div className="h-16 w-16 overflow-hidden border">
                  <Image
                    src={"/pictures/placeholder.png"}
                    alt={"Cart Placeholder"}
                    width={100}
                    height={100}
                  />
                </div>
                {/* Cart Text */}
                <div className="flex h-full flex-col">
                  <span className="text-lg">Added To</span>
                  <span className="text-xl font-semibold">Cart</span>
                </div>
              </div>
            }
          >
            {/* Cart Icon */}
            <Cart />
          </Tooltip>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed left-0 top-0 z-20 h-full w-full bg-gray-900 bg-opacity-50 ${
          isMenuOpen ? "block" : "hidden"
        }`}
        onClick={() => setIsMenuOpen(false)} // Close menu on click
      ></div>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed left-0 top-0 z-50 h-full w-64 transform bg-white ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        {/* Mobile Menu Content */}
        <div className="h-full p-4">
          {/* Mobile Logo */}
          <div className="flex flex-row items-center justify-between">
            <Image
              src={"/logos/logo.svg"}
              alt={"Main Logo"}
              className="h-[41px] w-[95px]"
              width={100}
              height={100}
            />
            {/* Close Menu Icon */}
            <div onClick={() => setIsMenuOpen(false)}>
              <Image
                src={"/icons/ArrowLeft.svg"}
                alt={"Close Menu"}
                width={20}
                height={20}
              />
            </div>
          </div>
          {/* Mobile Menu Items (Placeholder for actual menu content) */}
          <div className="relative my-4 h-full w-full">
            {/* Add your mobile menu items here */}
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {isLoginModalOpen && <Login onClose={handleLoginModalClose} />}
    </div>
  );
};

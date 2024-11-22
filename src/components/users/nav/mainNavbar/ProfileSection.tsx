import React from "react";
import { Popover, Button } from "antd";
import Image from "next/image";

const ProfileSection = () => {
  // Placeholder for user data and login status (replace with actual context logic later)
  const isLoggedIn = false; // Set this to true if the user is logged in
  const userName = "User"; // Replace with the actual user's name from context
  const profileImage = "/icons/User.svg"; // Replace with the actual profile image from context

  // Content for the Popover dropdown menu
  const popoverContent = (
    <div className="flex flex-col gap-2 !font-proxima text-gray-600">
      {/* "My Account" Button */}
      <Button
        type="link"
        className="w-full rounded-md border !px-2 !py-1 text-left hover:bg-gray-100 hover:text-gray-800"
        onClick={() => {
          console.log("Navigate to My Account"); // Placeholder for account navigation
        }}
      >
        My Account
      </Button>
      {/* "Logout" Button */}
      <Button
        type="link"
        className="w-full rounded-md border !px-2 !py-1 text-left hover:bg-gray-100 hover:text-gray-800"
        onClick={() => {
          console.log("Perform Logout"); // Placeholder for logout logic
        }}
      >
        Logout
      </Button>
    </div>
  );

  return (
    <div className="relative flex items-center gap-4">
      {isLoggedIn ? (
        // Popover for Logged-In User
        <Popover
          content={popoverContent} // Dropdown menu content
          trigger="click" // Opens on click
          placement="bottomRight" // Dropdown placement
          arrow={false} // Removes the arrow from the dropdown
        >
          <div className="hidden cursor-pointer items-center md:flex md:gap-2">
            {/* Display logged-in user's name */}
            <div className="leading-3 text-gray-600">Hi, {userName}</div>
            {/* Display logged-in user's profile image */}
            <Image
              src={profileImage}
              alt="User Icon"
              className="h-[24px] w-[24px] rounded-full"
              width={100}
              height={100}
            />
          </div>
        </Popover>
      ) : (
        // Simple profile icon for Guest User
        <div
          className="hidden cursor-pointer md:block"
          onClick={() => {
            console.log("Navigate to Sign In page"); // Placeholder for navigation to sign-in page
          }}
        >
          <Image
            src="/icons/User.svg"
            alt="Guest User Icon"
            className="h-[24px] w-[24px]"
            width={100}
            height={100}
          />
        </div>
      )}
    </div>
  );
};

export default ProfileSection;

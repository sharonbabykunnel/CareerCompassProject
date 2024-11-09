"use client";

import React, { useState } from "react";




const AvatarCircles = ({
  numPeople,
  avatar,
}) => {

  return (
    <div className={(" flex -space-x-3 rtl:space-x-reverse ")}>
      { avatar && avatar?.length > 0 && avatar?.map((url, index) => (
        <img
          key={index}
          className="h-6 w-6 rounded-full border-1 border-white dark:border-gray-800"
          src={url.profilePhoto || 'https://cdn-icons-png.flaticon.com/128/3059/3059518.png'}
          width={40}
          height={40}
          alt={`Avatar ${index + 1}`}
        />
      ))}
      {avatar && numPeople - avatar.length > 0 &&<a
        className="flex h-5  items-center w-5 justify-center rounded-full border-1 border-white bg-black text-center text-xs font-medium text-white hover:bg-gray-600 dark:border-gray-800 dark:bg-white dark:text-black"
      >
        +{numPeople- avatar.length}
      </a>}

    </div>
  );
};

export default AvatarCircles;

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProfileBox = ({count}) => {
  const [profileData, setProfileData] = useState([]);

  useEffect(() => {
    setProfileData(count/10)
  }, []);

  let progressWidth;
  switch (parseInt(profileData)) {
    case 3:
      progressWidth = "30%";
      break;
    case 4:
      progressWidth = "40%";
      break;
    case 5:
      progressWidth = "50%";
      break;
    case 6:
      progressWidth = "60%";
      break;
    case 7:
      progressWidth = "70%";
      break;
    case 8:
      progressWidth = "80%";
      break;
    case 9:
      progressWidth = "90%";
      break;
    default:
      progressWidth = "100%";
      break;
  }

  return (
    <div className="bg-white p-2 rounded-lg shadow-md mb-6 flex flex-col items-center">
      <div className="w-full">
        <span className="text-sm text-gray-600">Profile status</span>
        <div className="bg-gray-300 h-2 rounded-full mt-1">
            <div
              className="bg-blue-600 h-full rounded-full"
              style={{ width: progressWidth }}
            ></div>
        </div>
      </div>
    </div>
  );
};

export default ProfileBox;
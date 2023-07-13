import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { HandleProfile } from "../APIs/User";
import { googleLogout } from "@react-oauth/google";
import { GenerateToken } from "../APIs/Auth/auth";

const Profile = () => {
  const navigate = useNavigate();
  const [getUserData, setUserData] = useState(null);

  useEffect(() => {
    let localData;
    if (typeof window !== "undefined") {
      localData = window.localStorage.getItem("userData");
    }
    if (localData) {
      const userDetails = JSON.parse(localData);
      getProfileData(userDetails?.id);
      // console.log("User Data", userDetails)
    }
  }, []);

  const logoutUser = () => {
    googleLogout()
    localStorage.clear()
    window.location.replace("/");
    GenerateToken()
  }
  const getProfileData = async (userID) => {
    const userDetails = await HandleProfile(userID)
    setUserData(userDetails.data)
    // console.log('User Data', userDetails)
  }

  return (
    <div >

      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        USER PROFILE
      </h2>
      {getUserData ?
        <div >
          <div className="mt-8 flex justify-center">
            <img
              className="inline-block h-12 w-12  rounded-full ring-2 ring-white"
              src="/images/profile.png"
              alt=""
            />
          </div>

          <div className="mt-8 flex justify-center ">
            <div className="mt-6 border-t border-gray-100">
              <dl className="divide-y divide-gray-100">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">First name</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{getUserData?.first_name}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">Last name</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{getUserData?.last_name}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">Email</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{getUserData?.email}</dd>
                </div>
              </dl>
            </div>
          </div>

        </div>
        : 'Record Not Found' }

      <div className="mt-8 flex justify-center">
        <button
          className="flex w-20 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={logoutUser}>
          Log out
        </button>
      </div>
    </div>

  );
};

export default Profile;
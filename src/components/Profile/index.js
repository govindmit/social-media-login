import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { HandleProfile } from "../APIs/User";
import { googleLogout } from "@react-oauth/google";
import { GenerateToken } from "../APIs/Auth/auth";

const Profile = () => {
  const navigate = useNavigate();
  const [getUserData, setUserData] = useState(null);
  const [isLoading, setLoading] = useState(false);

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
    setLoading(true);
    const userDetails = await HandleProfile(userID)
    if (userDetails) {
      setUserData(userDetails.data)
      setLoading(false);
    }
  }

  return (
    <div className="mt-8 flex justify-center">
      <div className="w-4/12  rounded py-10 px-4 border-solid border-2 border-light-blue-500" >
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          USER PROFILE
        </h2>
        {!isLoading ?
          <div>
            {getUserData ?
              <div >
                <div className="mt-8 flex justify-center">
                  <img
                    className="inline-block h-12 w-12  rounded-full ring-2 ring-white"
                    src={getUserData?.profile_pic ? getUserData?.profile_pic : "images/profile.png"}
                    alt=""
                  />
                </div>

                <div className="mt-8 flex justify-center ">
                  <div className="mt-6 border-t border-gray-100">
                    <dl className="divide-y divide-gray-100">
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-md font-medium leading-6 text-gray-900">First name</dt>
                        <dd className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{getUserData?.first_name}</dd>
                      </div>
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-md font-medium leading-6 text-gray-900">Last name</dt>
                        <dd className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{getUserData?.last_name}</dd>
                      </div>
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-md font-medium leading-6 text-gray-900">Email</dt>
                        <dd className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{getUserData?.email}</dd>
                      </div>
                    </dl>
                  </div>
                </div>

                <div className="m-8 flex justify-center">
                  <button
                    className="flex w-20 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={logoutUser}>
                    Log out
                  </button>
                </div>

              </div>
              : <div className="mt-8 flex justify-center">Record Not Found </div>}
          </div>
          : <div className="mt-8 flex justify-center">Loading ... </div>}
      </div>
    </div>

  );
};

export default Profile;
import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const logoutUser = () => {
    navigate('/register');
    console.log("logout user");
  }

  return (
      <div>
        <h1>Profile</h1>
        <button onClick={logoutUser}>
          Log out
        </button>
      </div>
    
  );
};

export default Profile;
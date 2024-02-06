import React from 'react'
import LoginCard from '../component/LoginCard'

const Profile = ({authenticated, setAuthenticated, setUserID}) => {
  if (!authenticated) {
    return (
      <div>
        <h1>Profile</h1>
        <LoginCard setAuthenticated={setAuthenticated} setUserID={setUserID}/>
      </div>
    );
  }
  return (
    <div>
      <h1>Profile</h1>
      <p>User is authenticated!</p>
    </div>
  );
};

export default Profile
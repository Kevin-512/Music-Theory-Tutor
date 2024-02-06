import React from 'react'
import LoginCard from '../component/LoginCard'
import { Container } from '@mui/material';

const Profile = ({authenticated, setAuthenticated, setUserID}) => {
  if (!authenticated) {
    return (
      <Container>
        <LoginCard setAuthenticated={setAuthenticated} setUserID={setUserID}/>
      </Container>
    );
  }
  return (
    <Container>
      <p>User is authenticated!</p>
    </Container>
  );
};

export default Profile
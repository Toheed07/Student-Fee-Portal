import React from "react";

import {
  ProfileContainer,
  ProfileHeader,
  ProfileParagraph,
} from "./profile.styles";
import { useAuth } from "../../context/authContext";

const Profile = () => {
  const { currentUser } = useAuth();
  console.log(currentUser);
  return (
    <ProfileContainer>
      <ProfileHeader>
        {currentUser && currentUser.firstName} {currentUser && currentUser.lastName}
      </ProfileHeader>
      <ProfileParagraph>Email: {currentUser && currentUser.email}</ProfileParagraph>
      <ProfileParagraph>Roll Number: {currentUser && currentUser.rollNumber}</ProfileParagraph>
      <ProfileParagraph>Department: {currentUser && currentUser.departmentName}</ProfileParagraph>
      <ProfileParagraph>Fee: {currentUser && currentUser.departmentFee}</ProfileParagraph>
    </ProfileContainer>
  );
};

export default Profile;

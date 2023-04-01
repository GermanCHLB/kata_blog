import React from 'react';
import classes from './ProfilePage.module.scss'
import ProfileForm from "../ProfileForm/ProfileForm";

const ProfilePage = () => {
  return (
    <div className={classes.ProfilePage}>
      <ProfileForm/>
    </div>
  );
};

export default ProfilePage;
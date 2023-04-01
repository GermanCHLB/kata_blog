import React from 'react'

import ProfileForm from '../ProfileForm/ProfileForm'

import classes from './ProfilePage.module.scss'

const ProfilePage = () => {
  return (
    <div className={classes.ProfilePage}>
      <ProfileForm />
    </div>
  )
}

export default ProfilePage

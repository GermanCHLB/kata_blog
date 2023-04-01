import React from 'react'
import { useSelector } from 'react-redux'
import Redirect from 'react-router-dom/es/Redirect'

import SignUpForm from '../SignUpForm/SignUpForm'

import classes from './SignUpPage.module.scss'
const SignUpPage = () => {
  const isAuthorized = useSelector((state) => state.isAuthorized)
  if (!isAuthorized) {
    return (
      <div className={classes.SignUpPage}>
        <SignUpForm />
      </div>
    )
  } else {
    return <Redirect to={'/articles'} />
  }
}

export default SignUpPage

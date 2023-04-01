import React from 'react'
import { useSelector } from 'react-redux'
import Redirect from 'react-router-dom/es/Redirect'

import SignInForm from '../SignInForm/SignInForm'

import classes from './SignInPage.module.scss'
const SignInPage = () => {
  const isAuthorized = useSelector((state) => state.isAuthorized)
  if (!isAuthorized) {
    return (
      <div className={classes.SignInPage}>
        <SignInForm />
      </div>
    )
  } else {
    return <Redirect to={'/articles'} />
  }
}

export default SignInPage

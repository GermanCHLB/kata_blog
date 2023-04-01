import React from 'react';
import classes from './SignInPage.module.scss'
import SignInForm from "../SignInForm/SignInForm";
import {useSelector} from "react-redux";
import Redirect from "react-router-dom/es/Redirect";
const SignInPage = () => {
  const isAuthorized = useSelector(state => state.isAuthorized);
  if (!isAuthorized) {
    return (
      <div className={classes.SignInPage}>
        <SignInForm/>
      </div>
    );
  } else {
    return (
      <Redirect to={'/articles'}/>
    )
  }
};

export default SignInPage;
import React from 'react';
import classes from './SignUpPage.module.scss'
import SignUpForm from "../SignUpForm/SignUpForm";
import {useSelector} from "react-redux";
import Redirect from "react-router-dom/es/Redirect";
const SignUpPage = () => {
  const isAuthorized = useSelector(state => state.isAuthorized);
  if (!isAuthorized) {
    return (
      <div className={classes.SignUpPage}>
        <SignUpForm/>
      </div>
    );
  }

  else {
    return <Redirect to={'/articles'}/>
  }
};

export default SignUpPage;
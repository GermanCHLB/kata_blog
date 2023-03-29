import React from 'react';
import classes from "./SignUpForm.module.scss";
const SignUpForm = () => {
  return (
    <form className={classes.SignUpForm}>
      <h1>Create new account</h1>
      <label>
        Username
        <input type="text" placeholder='Username'/>
      </label>

      <label>
        Email address
        <input type="text" placeholder='Email address'/>
      </label>

      <label>
        Password
        <input type="text" placeholder='Password'/>
      </label>

      <label>
        Repeat Password
        <input type="text" placeholder='Password'/>
      </label>

      <hr/>

      <label className={classes.checkbox}>
        <input type="checkbox"/>
        <span>I agree to the processing of my personal information</span>
      </label>

      <button className={classes['create-btn']}>
        Create
      </button>

      <p className={classes.signIn}>Already have an account? <a href='#'>Sign In</a>.</p>
    </form>
  );
};

export default SignUpForm;
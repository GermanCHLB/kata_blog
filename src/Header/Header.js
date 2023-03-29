import React from 'react';
import classes from './Header.module.scss'
import avatar from '../img/Rectangle 1.svg'

const Header = ({isAuthorized}) => {
  return (
    <header className={classes.Header}>
      <h3 className={classes.title}>Realworld Blog</h3>
      {isAuthorized
        ? <div className={classes.menu}>
          <button className={classes['create-btn']}>Create article</button>
          <div className={classes.profile}>
            <span className={classes.username}>name</span>
            <img src={avatar} alt="" />
          </div>
          <button className={classes['logOut-btn']}>Log Out</button>
        </div>
        : <div className={classes.menu}>
          <button className={classes['signIn-btn']}>Sign In</button>
          <button className={classes['signUp-btn']}>Sign Up</button>
        </div>
      }
    </header>
  );
};

export default Header;
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { logOutAction } from '../reducer'

import classes from './Header.module.scss'

const Header = () => {
  const isAuthorized = useSelector((state) => state.isAuthorized)
  const avatar = useSelector((state) => state.user.image)
  const username = useSelector((state) => state.user.username)
  const dispatch = useDispatch()
  return (
    <header className={classes.Header}>
      <h3 className={classes.title}>
        <Link to={'/articles'}>Realworld Blog</Link>
      </h3>
      {isAuthorized ? (
        <div className={classes.menu}>
          <Link to={'/new-article'} className={classes['create-btn']}>
            Create article
          </Link>
          <div className={classes.profile}>
            <Link to={'/profile'}>
              <span className={classes.username}>{username}</span>
              <img src={avatar} alt="" />
            </Link>
          </div>
          <button
            className={classes['logOut-btn']}
            onClick={() => {
              dispatch(logOutAction())
              localStorage.removeItem('user')
            }}
          >
            Log Out
          </button>
        </div>
      ) : (
        <div className={classes.menu}>
          <Link to={'/sign-in'} className={classes['signIn-btn']}>
            Sign In
          </Link>
          <Link to={'/sign-up'} className={classes['signUp-btn']}>
            Sign Up
          </Link>
        </div>
      )}
    </header>
  )
}

export default Header

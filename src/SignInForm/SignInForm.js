import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { fetchSignIn } from '../asyncActions/signIn'

import classes from './SignInForm.module.scss'
const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' })
  const dispatch = useDispatch()
  const loginError = useSelector((state) => state.user.status) === 'ERROR'
  const onSubmit = (data) => {
    dispatch(
      fetchSignIn({
        email: data.Email,
        password: data.Password,
      })
    )
  }

  return (
    <form className={classes.SignInForm} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={classes.title}>Sign In</h1>
      <label>
        Email address
        <input
          type="text"
          placeholder="Email address"
          className={errors.Email || loginError ? classes.error : ''}
          {...register('Email', {
            required: 'Email is required',
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: 'Your Email must be correct.',
            },
          })}
        />
        {errors.Email ? <p className={classes['error-message']}>{errors.Email.message}</p> : ''}
      </label>

      <label>
        Password
        <input
          type="text"
          placeholder="Password"
          className={errors.Password || loginError ? classes.error : ''}
          {...register('Password', {
            required: 'Password is required',
          })}
        />
        {errors.Password ? <p className={classes['error-message']}>{errors.Password.message}</p> : ''}
      </label>

      <button className={classes['login-btn']}>Login</button>

      <p className={classes.signUp}>
        Don’t have an account? <Link to={'/sign-up'}>Sign Up</Link>.
      </p>
    </form>
  )
}

export default SignInForm

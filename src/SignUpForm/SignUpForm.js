import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import { fetchSignUp } from '../asyncActions/signUp'

import classes from './SignUpForm.module.scss'

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onChange' })
  const dispatch = useDispatch()
  const onSubmit = (data) => {
    dispatch(
      fetchSignUp({
        username: data.Username,
        email: data.Email,
        password: data.Password,
      })
    )
  }

  const [passwordValue, setPasswordValue] = useState('')

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'Password') {
        setPasswordValue(value.Password)
      }
    })
    return () => subscription.unsubscribe()
  }, [watch])

  return (
    <form className={classes.SignUpForm} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={classes.title}>Create new account</h1>
      <label>
        Username
        <input
          type="text"
          placeholder="Username"
          className={errors.Username ? classes.error : ''}
          {...register('Username', {
            required: 'Username is required',
            minLength: {
              value: 3,
              message: 'Your username needs to be at least 3 characters.',
            },
            maxLength: {
              value: 20,
              message: 'Your username must be no more than 20 characters.',
            },
          })}
        />
        {errors.Username ? <p className={classes['error-message']}>{errors.Username.message}</p> : ''}
      </label>

      <label>
        Email address
        <input
          type="text"
          placeholder="Email address"
          className={errors.Email ? classes.error : ''}
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
          className={errors.Password ? classes.error : ''}
          {...register('Password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Your password needs to be at least 6 characters.',
            },
            maxLength: {
              value: 40,
              message: 'Your password must be no more than 40 characters.',
            },
          })}
        />
        {errors.Password ? <p className={classes['error-message']}>{errors.Password.message}</p> : ''}
      </label>

      <label>
        Repeat Password
        <input
          type="text"
          placeholder="Password"
          className={errors.PasswordRepeat ? classes.error : ''}
          {...register('PasswordRepeat', {
            required: 'Repeat password is required',
            validate: (v) => v === passwordValue || 'Passwords must match',
          })}
        />
        {errors.PasswordRepeat ? <p className={classes['error-message']}>{errors.PasswordRepeat.message}</p> : ''}
      </label>

      <hr />

      <label className={classes.checkbox}>
        <input
          type="checkbox"
          {...register('checkbox', {
            required: 'You must agree.',
          })}
        />
        <span>I agree to the processing of my personal information</span>
        {errors.checkbox ? <p className={classes['error-message']}>{errors.checkbox.message}</p> : ''}
      </label>

      <button className={classes['create-btn']}>Create</button>

      <p className={classes.signIn}>
        Already have an account? <Link to="/sign-in">Sign In</Link>.
      </p>
    </form>
  )
}

export default SignUpForm

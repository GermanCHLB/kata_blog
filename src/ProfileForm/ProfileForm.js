import React from 'react';
import classes from './ProfileForm.module.scss'
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {fetchProfile} from "../asyncActions/profile";

const ProfileForm = () => {
  const {register, handleSubmit, reset, formState: {errors}} = useForm({mode: 'onChange'})
  const dispatch = useDispatch()
  const token = useSelector(state => state.user.token)
  const status = useSelector(state => state.user.status)
  const isError = status === 'ERROR';
  const onSubmit = data => {
    dispatch(fetchProfile({
      email: data.Email,
      password: data.Password,
      image: data.Avatar,
      username: data.Username
    }, token))
    if (!isError) {
      reset({
        Username: '',
        Password: '',
        Avatar: '',
        Email: '',
      })
    }
  }

  return (
    <form className={classes.ProfileForm} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={classes.title}>Create new account</h1>
      <label>
        Username
        <input type="text" placeholder='Username' className={errors.Username || isError ? classes.error : ''}
               {...register('Username', {
                 required: 'Username is required',
               })}
        />
        {errors.Username ? <p className={classes['error-message']}>{errors.Username.message}</p> : ''}
      </label>

      <label>
        Email address
        <input type="text" placeholder='Email address' className={errors.Email || isError ? classes.error : '' }
               {...register('Email', {
                 required: 'Email is required',
                 pattern: {
                   value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                   message: 'Your Email must be correct.'
                 }
               })}
        />
        {errors.Email ? <p className={classes['error-message']}>{errors.Email.message}</p> : ''}
      </label>

      <label>
        New password
        <input type="text" placeholder='New password' className={errors.Password || isError ? classes.error : '' }
               {...register('Password', {
                 required: 'Password is required',
                 minLength: {
                   value: 6,
                   message: 'Your password needs to be at least 6 characters.'
                 },
                 maxLength: {
                   value: 40,
                   message: 'Your password must be no more than 40 characters.'
                 }
               })}/>
        {errors.Password ? <p className={classes['error-message']}>{errors.Password.message}</p> : ''}
      </label>

      <label>
        Avatar image (url)
        <input type="text" placeholder='Avatar image' className={errors.Avatar || isError ? classes.error : '' }
               {...register('Avatar', {
                 required: 'Avatar image is required',
                 pattern: {
                   value: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
                   message: 'Your url must be correct',
                 }
               })}
        />
        {errors.Avatar ? <p className={classes['error-message']}>{errors.Avatar.message}</p> : ''}
      </label>

      <button className={classes['save-btn']}>
        Save
      </button>
    </form>
  );
};

export default ProfileForm;
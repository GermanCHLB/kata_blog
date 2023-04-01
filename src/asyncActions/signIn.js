import {setErrorAction, signInAction, signUpAction} from "../reducer";

export const fetchSignIn = (data) => {
  const user = {
    email: data.email,
    password: data.password,
  }
  return (dispatch) => {
    fetch('https://api.realworld.io/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({user: user})
    })
      .then(res => {
        if (res.ok) {
          return(res.json())
        } else {
          dispatch(setErrorAction())
        }
      })
      .then(json => {
        dispatch(signInAction(json))
        localStorage.setItem('user', JSON.stringify(json))
      })
      .catch(err => {
        throw new Error(err)
      })
  }
}
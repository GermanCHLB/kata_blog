import {setErrorAction, signInAction} from "../reducer";

export const fetchProfile = (data, token) => {
  const user = {
    email: data.email,
    password: data.password,
    username: data.username,
    bio: '',
    image: data.image,
  }
  return (dispatch) => {
    fetch('https://api.realworld.io/api/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Token ${token}`,
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
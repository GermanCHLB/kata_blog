import { signUpAction } from '../reducer'

export const fetchSignUp = (data) => {
  const user = {
    username: data.username,
    email: data.email,
    password: data.password,
  }
  return (dispatch) => {
    fetch('https://api.realworld.io/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ user: user }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
      })
      .then((json) => {
        dispatch(signUpAction(json))
        localStorage.setItem('user', JSON.stringify(json))
      })
      .catch((err) => console.log(err))
  }
}

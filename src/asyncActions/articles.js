import {
  createArticleAction,
  deleteArticleAction, editArticleAction,
  getArticleDataAction,
  getDataAction,
  setLikeAction,
  startLoadingAction
} from "../reducer";

export const fetchArticles = (page, token) => {
  const offset = (page - 1) * 5
  if (token) {
    return (dispatch) => {
      dispatch(startLoadingAction())
      fetch(`https://api.realworld.io/api/articles?limit=5&offset=${offset}`, {
        method: 'GET',
        headers: {
          'Authorization': `Token ${token}`
      },
      })
        .then(response => response.json())
        .then(json => dispatch(getDataAction(json)))
        .catch(error => {
          throw new Error(error)
        })
    }
  } else {
    return (dispatch) => {
      dispatch(startLoadingAction())
      fetch(`https://api.realworld.io/api/articles?limit=5&offset=${offset}`)
        .then(response => response.json())
        .then(json => dispatch(getDataAction(json)))
        .catch(error => {
          throw new Error(error)
        })
    }
  }
}

export const fetchArticle = (slug, token) => {
  if (token) {
    return (dispatch) => {
      dispatch(startLoadingAction())
      fetch(`https://api.realworld.io/api/articles/${slug}`, {
          method: 'GET',
          headers: {
            'Authorization': `Token ${token}`,
          }
        })
        .then(response => response.json())
        .then(json => dispatch(getArticleDataAction(json)))
        .catch(error => {
          throw new Error(error)
        })
    }
  } else {
    return (dispatch) => {
      dispatch(startLoadingAction())
      fetch(`https://api.realworld.io/api/articles/${slug}`)
        .then(response => response.json())
        .then(json => dispatch(getArticleDataAction(json)))
        .catch(error => {
          throw new Error(error)
        })
    }
  }
}

export const setLike = (slug, token) => {
  return (dispatch) => {
    fetch(`https://api.realworld.io/api/articles/${slug}/favorite`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`,
      }
    })
      .then(res => res.json())
      .then(json => dispatch(setLikeAction(json.article)))
      .catch(error => {
        throw new Error(error)
      })
  }
}

export const removeLike = (slug, token) => {
  return (dispatch) => {
    fetch(`https://api.realworld.io/api/articles/${slug}/favorite`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Token ${token}`,
      }
    })
      .then(res => res.json())
      .then(json => dispatch(setLikeAction(json.article)))
      .catch(error => {
        throw new Error(error)
      })
  }
}

export const createArticle = (data, token) => {
  const article = {
    title: data.title,
    description: data.description,
    body: data.text,
    tagList: data.tags,
  }


  return (dispatch) => {
    fetch('https://api.realworld.io/api/articles', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({article: article})
    })
      .then(res => res.json())
      .then(json => {
        dispatch(createArticleAction(json.article))
      })
      .catch(error => {
        throw new Error(error)
      })
  }
}

export const deleteArticle = (slug, token) => {
  return (dispatch) => {
    fetch(`https://api.realworld.io/api/articles/${slug}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Token ${token}`,
      }
    })
      .then((res) => {
        if (res.ok) {
          dispatch(deleteArticleAction(slug))
        }
      })
  }
}

export const editArticle = (slug, token, data) => {
  const article = {
    title: data.title,
    description: data.description,
    body: data.text,
    tagList: data.tags,
  }
  return (dispatch) => {
    fetch(`https://api.realworld.io/api/articles/${slug}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({article: article})
    })
      .then(res => res.json())
      .then(json => dispatch(editArticleAction({data: json, slug: slug})))
  }
}
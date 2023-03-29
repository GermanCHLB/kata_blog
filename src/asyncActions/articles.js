import {getArticleDataAction, getDataAction, startLoadingAction} from "../reducer";

export const fetchArticles = (page) => {
  const offset = (page - 1) * 5
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

export const fetchArticle = (slug) => {
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
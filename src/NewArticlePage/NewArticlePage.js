import React from 'react'

import NewArticleForm from '../NewArticleForm/NewArticleForm'

import classes from './NewArticlePage.module.scss'

const NewArticlePage = () => {
  return (
    <div className={classes.NewArticlePage}>
      <NewArticleForm />
    </div>
  )
}

export default NewArticlePage

import React from 'react'
import { Pagination } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import { fetchArticles } from '../asyncActions/articles'
import ArticlesList from '../ArticlesList/ArticlesList'
import { changePageAction } from '../reducer'
import Loader from '../Loader/Loader'

import classes from './ArticlesPage.module.scss'

const ArticlesPage = () => {
  const token = useSelector((state) => state.user.token)
  const dispatch = useDispatch()
  const page = useSelector((state) => state.page)
  const totalArticles = useSelector((state) => state.totalCount)
  const articles = useSelector((state) => state.articles)
  const isLoading = useSelector((state) => state.isLoading)
  if (articles.length === 0) {
    dispatch(fetchArticles(page, token))
  }

  if (isLoading) {
    return <Loader />
  }
  return (
    <div className={classes.ArticlesPage}>
      <ArticlesList articles={articles} />
      <Pagination
        current={page}
        onChange={(p) => {
          dispatch(changePageAction(p))
          dispatch(fetchArticles(p, token))
        }}
        total={totalArticles}
        pageSize={5}
        showSizeChanger={false}
        showPrevNextJumpers={false}
        style={{ marginTop: '30px', marginBottom: '20px' }}
      />
    </div>
  )
}

export default ArticlesPage

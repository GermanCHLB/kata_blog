import React from 'react';
import classes from './ArticlePage.module.scss'
import Article from "../Article/Article";
import {useDispatch, useSelector} from "react-redux";
import {fetchArticle} from "../asyncActions/articles";
import Loader from "../Loader/Loader";
const ArticlePage = ({slug}) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.isLoading)
  const data = useSelector(state => state.articleData)

  if (data === '' || slug !== data.slug) {
    dispatch(fetchArticle(slug))
  }

  if (isLoading) {
    return (
      <Loader/>
    )
  }

  return (
    <div className={classes.ArticlePage}>
      <Article
        text={data.body}
        description={data.description}
        title={data.title}
        tags={data.tagList}
        likes={data.favoritesCount}
        username={data.author.username}
        date={data.updatedAt}
        img={data.author.image}
      />
    </div>
  );
};

export default ArticlePage;
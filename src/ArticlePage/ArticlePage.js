import React from 'react';
import classes from './ArticlePage.module.scss'
import Article from "../Article/Article";
import {useDispatch, useSelector} from "react-redux";
import {fetchArticle} from "../asyncActions/articles";
import Loader from "../Loader/Loader";
import ArticleFull from "../ArticleFull/ArticleFull";
const ArticlePage = ({slug}) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.isLoading)
  const data = useSelector(state => state.articleData)
  const token = useSelector(state => state.user.token)

  if (data === '' || slug !== data.slug) {
    dispatch(fetchArticle(slug, token))
  }

  if (isLoading || data === '') {
    return (
      <Loader/>
    )
  }

  return (
    <div className={classes.ArticlePage}>
      <ArticleFull
        text={data.body}
        description={data.description}
        title={data.title}
        tags={data.tagList}
        likes={data.favoritesCount}
        username={data.author.username}
        date={data.updatedAt}
        img={data.author.image}
        liked={data.favorited}
        slug={data.slug}
      />
    </div>
  );
};

export default ArticlePage;
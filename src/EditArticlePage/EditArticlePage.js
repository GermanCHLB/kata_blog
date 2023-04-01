import React from 'react';
import classes from './EditArticlePage.module.scss'
import NewArticleForm from "../NewArticleForm/NewArticleForm";
import {fetchArticle} from "../asyncActions/articles";
import {useDispatch, useSelector} from "react-redux";
const EditArticlePage = ({slug}) => {
  const token = useSelector(state => state.user.token)
  const dispatch = useDispatch();
  const data = useSelector(state => state.articleData)

  if (data === '') {
    dispatch(fetchArticle(slug, token))
  }

  return (
    <div className={classes.EditArticlePage}>
      <NewArticleForm
        slug={slug}
        isEdit={true}
        descriptionInit={data.description}
        titleInit={data.title}
        textInit={data.body}
        tagsInit={data.tagList}
      />
    </div>
  );
};

export default EditArticlePage;
import React from 'react';
import classes from './NewArticlePage.module.scss'
import NewArticleForm from "../NewArticleForm/NewArticleForm";
const NewArticlePage = () => {
  return (
    <div className={classes.NewArticlePage}>
      <NewArticleForm/>
    </div>
  );
};

export default NewArticlePage;
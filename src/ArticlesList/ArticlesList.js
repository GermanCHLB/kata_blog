import React from 'react';
import classes from './ArticlesList.module.scss'
import Article from "../Article/Article";

const ArticlesList = ({articles}) => {
  return (
    <ul className={classes.ArticlesList}>
      {articles.map(el => <li key={el.slug}><Article
        description={el.description}
        date={el.updatedAt}
        tags={el.tagList}
        title={el.title}
        username={el.author.username}
        likes={el.favoritesCount}
        slug={el.slug}
        text=''
        img={el.author.image}
        liked={el.favorited}
      /></li>)}
    </ul>
  );
};

export default ArticlesList;
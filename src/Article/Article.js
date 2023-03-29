import React from 'react';
import classes from './Article.module.scss'
import heart from "../img/Vector.svg"
import {Link} from "react-router-dom";
import {compiler} from "markdown-to-jsx";
import {format} from "date-fns";

const Article = ({title, likes, username, date, description, tags, slug, text, img}) => {
  const dateFormatted = format(new Date(date), 'PP')

  return (
    <div className={classes.Article}>
      <div className={classes.header}>
        <div className={classes.main}>
          <div className={classes.mainWrap}>
            <Link to={`/articles/${slug}`} className={classes.title}>
              {title}
            </Link>
            <span className={classes.likes}>
            <img src={heart} alt="heart" className={classes.heart}/>
            <span className={classes['likes-counter']}>{likes}</span>
          </span>
          </div>
          <ul className={classes.tags}>
            {tags.map((el, index) => <li key={index} className={classes.tag}>{el}</li>)}
          </ul>
        </div>
        <div className={classes.author}>
          <div className={classes.wrap}>
            <h3 className={classes.name}>{username}</h3>
            <span className={classes.date}>
            {dateFormatted}
          </span>
          </div>
          <img src={img} alt="avatar" className={classes.avatar}/>

        </div>
      </div>
      <div className={classes.body}>
        <p className={classes.description}>{description}</p>
        {text.length !== 0
          ?
          <p className={classes.text}>{compiler(text.split('\\n').join('\n\n'), {wrapper: null})}</p>
          : ''
        }
      </div>
    </div>
  );
};

export default Article;
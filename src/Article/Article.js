import React from 'react'
import { Link } from 'react-router-dom'
import { compiler } from 'markdown-to-jsx'
import { format } from 'date-fns'
import { useDispatch, useSelector } from 'react-redux'

import heartLiked from '../img/path4.svg'
import heart from '../img/Vector.svg'
import { removeLike, setLike } from '../asyncActions/articles'

import classes from './Article.module.scss'

const Article = ({ title, likes, username, date, description, tags, slug, text, img, liked }) => {
  const dateFormatted = format(new Date(date), 'PP')
  const isAuthorized = useSelector((state) => state.isAuthorized)
  const token = useSelector((state) => state.user.token)
  const dispatch = useDispatch()

  let heartClasses = classes.heart
  let heartLink
  if (isAuthorized) {
    heartClasses += ' ' + classes.authorized
  }

  if (liked) {
    heartLink = heartLiked
  } else {
    heartLink = heart
  }

  return (
    <div className={classes.Article}>
      <div className={classes.header}>
        <div className={classes.main}>
          <div className={classes.mainWrap}>
            <Link to={`/articles/${slug}`} className={classes.title}>
              {title}
            </Link>
            <span className={classes.likes}>
              <img
                src={heartLink}
                alt="heart"
                className={heartClasses}
                onClick={() => {
                  if (isAuthorized) {
                    if (liked) {
                      dispatch(removeLike(slug, token))
                    } else {
                      dispatch(setLike(slug, token))
                    }
                  }
                }}
              />
              <span className={classes['likes-counter']}>{likes}</span>
            </span>
          </div>
          <ul className={classes.tags}>
            {tags.map((el, index) => (
              <li key={index} className={classes.tag}>
                {el}
              </li>
            ))}
          </ul>
        </div>
        <div className={classes.author}>
          <div className={classes.wrap}>
            <h3 className={classes.name}>{username}</h3>
            <span className={classes.date}>{dateFormatted}</span>
          </div>
          <img src={img} alt="avatar" className={classes.avatar} />
        </div>
      </div>
      <div className={classes.body}>
        <p className={classes.description}>{description}</p>
        {text.length !== 0 ? (
          <p className={classes.text}>{compiler(text.split('\\n').join('\n\n'), { wrapper: null })}</p>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default Article

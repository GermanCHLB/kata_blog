import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { compiler } from 'markdown-to-jsx'
import { format } from 'date-fns'
import { useDispatch, useSelector } from 'react-redux'
import Redirect from 'react-router-dom/es/Redirect'

import heartLiked from '../img/path4.svg'
import { deleteArticle, removeLike, setLike } from '../asyncActions/articles'
import infoImg from '../img/info.svg'
import heart from '../img/Vector.svg'

import classes from './ArticleFull.module.scss'

const ArticleFull = ({ title, likes, username, date, description, tags, slug, text, img, liked }) => {
  const dateFormatted = format(new Date(date), 'PP')
  const isAuthorized = useSelector((state) => state.isAuthorized)
  const token = useSelector((state) => state.user.token)
  const user = useSelector((state) => state.user.username)
  const dispatch = useDispatch()
  const [isDeleted, setIsDeleted] = useState(false)

  const [showModal, setShowModal] = useState(false)

  let modalClasses = classes.modal

  if (showModal) {
    modalClasses += ' ' + classes.active
  }

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

  if (isDeleted) {
    return <Redirect to={'/articles'} />
  } else {
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
          <div className={classes.descriptionWrapper}>
            <p className={classes.description}>{description}</p>
            {username === user ? (
              <div className={classes.btns}>
                <button
                  className={classes['delete-btn']}
                  onClick={() => {
                    setShowModal(true)
                  }}
                >
                  Delete
                  <div className={modalClasses}>
                    <div className={classes['modal-text']}>
                      <img src={infoImg} alt="i" />
                      <p>Are you sure to delete this article?</p>
                    </div>
                    <div className={classes['modal-btns']}>
                      <button
                        className={classes['no-btn']}
                        onClick={(e) => {
                          setShowModal(false)
                          e.stopPropagation()
                        }}
                      >
                        No
                      </button>
                      <button
                        className={classes['yes-btn']}
                        onClick={(e) => {
                          e.stopPropagation()
                          dispatch(deleteArticle(slug, token))
                          setIsDeleted(true)
                        }}
                      >
                        Yes
                      </button>
                    </div>
                  </div>
                </button>
                <Link to={`/articles/${slug}/edit`} className={classes['edit-btn']}>
                  Edit
                </Link>
              </div>
            ) : (
              ''
            )}
          </div>
          <p className={classes.text}>{compiler(text.split('\\n').join('\n\n'), { wrapper: null })}</p>
        </div>
      </div>
    )
  }
}

export default ArticleFull

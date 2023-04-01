import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { createArticle, editArticle } from '../asyncActions/articles'

import classes from './NewArticleForm.module.scss'
const NewArticleForm = ({
  textInit = '',
  descriptionInit = '',
  tagsInit = [],
  titleInit = '',
  isEdit = false,
  slug,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onChange' })
  const [tags, setTags] = useState(tagsInit)
  const [title, setTitle] = useState(titleInit)
  const [text, setText] = useState(textInit)
  const [description, setDescription] = useState(descriptionInit)
  const token = useSelector((state) => state.user.token)
  const dispatch = useDispatch()
  const [isSended, setIsSended] = useState(false)

  const onSubmit = (data) => {
    if (isEdit) {
      dispatch(
        editArticle(slug, token, {
          title: data.Title,
          description: data.Description,
          text: data.Text,
          tags: tags,
        })
      )
    } else {
      dispatch(
        createArticle(
          {
            title: data.Title,
            description: data.Description,
            text: data.Text,
            tags: tags,
          },
          token
        )
      )
    }

    reset({
      Title: '',
      Text: '',
      Description: '',
    })

    setTags([])

    setIsSended(true)
  }

  if (isSended) {
    return <Redirect to={'/articles'} />
  } else {
    return (
      <form className={classes.NewArticleForm} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={classes.title}>{!isEdit ? 'Create new article' : 'Edit Article'}</h1>
        <label>
          Title
          <input
            type="text"
            placeholder="Title"
            value={title}
            className={errors.Title ? classes.error : ''}
            {...register('Title', {
              required: 'Title is required',
            })}
            onChange={(e) => {
              setTitle(e.target.value)
            }}
          />
          {errors.Title ? <p className={classes['error-message']}>{errors.Title.message}</p> : ''}
        </label>

        <label>
          Short description
          <input
            type="text"
            placeholder="Short description"
            className={errors.Description ? classes.error : ''}
            {...register('Description', {
              required: 'Description is required',
            })}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value)
            }}
          />
          {errors.Description ? <p className={classes['error-message']}>{errors.Description.message}</p> : ''}
        </label>

        <label>
          Text
          <textarea
            placeholder="Text"
            className={errors.Text ? classes.error : ''}
            {...register('Text', {
              required: 'Text is required',
            })}
            value={text}
            onChange={(e) => {
              setText(e.target.value)
            }}
          />
          {errors.Text ? <p className={classes['error-message']}>{errors.Text.message}</p> : ''}
        </label>

        <label>
          Tags
          <ul className={classes.tags}>
            {tags.length === 0 ? (
              <li className={classes.tag}>
                <button
                  className={classes['addTag-btn']}
                  onClick={(e) => {
                    e.preventDefault()
                    setTags([...tags, ''])
                  }}
                >
                  Add tag
                </button>
              </li>
            ) : (
              tags.map((el, index) => {
                if (index !== tags.length - 1) {
                  return (
                    <li className={classes.tag} key={index}>
                      <input
                        type="text"
                        value={el}
                        placeholder="Tag"
                        onChange={(e) => {
                          setTags(
                            tags.map((el1, index1) => {
                              if (index1 === index) {
                                return e.target.value
                              } else {
                                return el1
                              }
                            })
                          )
                        }}
                      />
                      <button
                        className={classes['del-btn']}
                        onClick={(e) => {
                          e.preventDefault()
                          setTags(tags.filter((elem, index1) => index !== index1))
                        }}
                      >
                        Delete
                      </button>
                    </li>
                  )
                } else {
                  return (
                    <li className={classes.tag} key={index}>
                      <input
                        type="text"
                        value={el}
                        placeholder="Tag"
                        onChange={(e) => {
                          setTags(
                            tags.map((el1, index1) => {
                              if (index1 === index) {
                                return e.target.value
                              } else {
                                return el1
                              }
                            })
                          )
                        }}
                      />
                      <button
                        className={classes['del-btn']}
                        onClick={(e) => {
                          e.preventDefault()
                          setTags(tags.filter((elem, index1) => index !== index1))
                        }}
                      >
                        Delete
                      </button>
                      <button
                        className={classes['addTag-btn']}
                        onClick={(e) => {
                          e.preventDefault()
                          setTags([...tags, ''])
                        }}
                      >
                        Add tag
                      </button>
                    </li>
                  )
                }
              })
            )}
          </ul>
        </label>

        <button className={classes['send-btn']}>Send</button>
      </form>
    )
  }
}

export default NewArticleForm

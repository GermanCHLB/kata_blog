const defaultState = {
  totalCount: 0,
  totalPages: 0,
  page: 1,
  articles: [],
  isLoading: true,
  articleData: '',
  isAuthorized: false,
  user: {
    status: '',
    errorMessage: '',
    email: '',
    token: '',
    username: '',
    bio: '',
    image: '',
  },
}

const GET_DATA = 'GET_DATA'
const CHANGE_PAGE = 'CHANGE_PAGE'
const START_LOADING = 'START_LOADING'
const GET_ARTICLE_DATA = 'GET_ARTICLE_DATA'
const SIGN_IN = 'SIGN_IN'
const SIGN_UP = 'SIGN_UP'
const SET_USER = 'SET_USER'
const LOG_OUT = 'LOG_OUT'
const SET_ERROR = 'SET_ERROR'
const SET_LIKE = 'SET_LIKE'
const CREATE_ARTICLE = 'CREATE_ARTICLE'
const DELETE_ARTICLE = 'DELETE_ARTICLE'
const EDIT_ARTICLE = 'EDIT_ARTICLE'

export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_DATA:
      return {
        ...state,
        articles: action.payload.articles,
        totalCount: action.payload.articlesCount,
        totalPages: Math.ceil(action.payload.articlesCount / 5),
        isLoading: false,
      }

    case CHANGE_PAGE:
      return {
        ...state,
        page: action.payload,
      }

    case START_LOADING:
      return {
        ...state,
        isLoading: true,
      }

    case GET_ARTICLE_DATA:
      return {
        ...state,
        articleData: action.payload.article,
        isLoading: false,
      }

    case SIGN_IN:
      return {
        ...state,
        user: {
          status: 'OK',
          errorMessage: '',
          ...action.payload.user,
        },
        isAuthorized: true,
      }

    case SIGN_UP:
      return {
        ...state,
        user: {
          status: 'OK',
          errorMessage: '',
          ...action.payload.user,
        },
        isAuthorized: true,
      }

    case SET_USER:
      return {
        ...state,
        user: {
          status: 'OK',
          errorMessage: '',
          ...action.payload.user,
        },
        isAuthorized: true,
      }

    case LOG_OUT:
      return {
        ...state,
        user: {
          status: '',
          errorMessage: '',
        },
        isAuthorized: false,
      }

    case SET_ERROR:
      return {
        ...state,
        user: {
          ...state.user,
          status: 'ERROR',
        },
      }

    case SET_LIKE:
      return {
        ...state,
        articles: state.articles.map((el) => {
          if (el.slug === action.payload.slug) {
            return action.payload
          } else {
            return el
          }
        }),
      }

    case CREATE_ARTICLE:
      return {
        ...state,
        articles: [action.payload, ...state.articles],
      }

    case DELETE_ARTICLE:
      return {
        ...state,
        articles: state.articles.filter((el) => el.slug !== action.payload),
      }

    case EDIT_ARTICLE:
      return {
        ...state,
        articles: state.articles.map((el) => {
          if (el.slug === action.payload.slug) {
            return action.payload.data.article
          } else {
            return el
          }
        }),
      }

    default:
      return state
  }
}

export const getDataAction = (payload) => ({ type: GET_DATA, payload })
export const changePageAction = (payload) => ({ type: CHANGE_PAGE, payload })
export const startLoadingAction = () => ({ type: START_LOADING })
export const getArticleDataAction = (payload) => ({ type: GET_ARTICLE_DATA, payload })
export const signInAction = (payload) => ({ type: SIGN_IN, payload })
export const signUpAction = (payload) => ({ type: SIGN_UP, payload })
export const setUserAction = (payload) => ({ type: SET_USER, payload })
export const logOutAction = () => ({ type: LOG_OUT })
export const setErrorAction = () => ({ type: SET_ERROR })
export const setLikeAction = (payload) => ({ type: SET_LIKE, payload })
export const createArticleAction = (payload) => ({ type: CREATE_ARTICLE, payload })
export const deleteArticleAction = (payload) => ({ type: DELETE_ARTICLE, payload })
export const editArticleAction = (payload) => ({ type: EDIT_ARTICLE, payload })

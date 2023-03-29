const defaultState = {
  totalCount : 0,
  totalPages: 0,
  page: 1,
  articles: [],
  isLoading: true,
  articleData: '',
}

const GET_DATA = 'GET_DATA';
const CHANGE_PAGE = 'CHANGE_PAGE';
const START_LOADING = 'START_LOADING';
const GET_ARTICLE_DATA = 'GET_ARTICLE_DATA';

export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_DATA:
      return {
        ...state,
        articles: action.payload.articles,
        totalCount: action.payload.articlesCount,
        totalPages: Math.ceil(action.payload.articlesCount/5),
        isLoading: false,
      }

    case CHANGE_PAGE:
      return {
        ...state,
        page: action.payload
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

    default:
      return state
  }
}

export const getDataAction = (payload) => ({type: GET_DATA, payload})
export const changePageAction = (payload) => ({type: CHANGE_PAGE, payload})
export const startLoadingAction = () => ({type: START_LOADING})
export const getArticleDataAction = (payload) => ({type: GET_ARTICLE_DATA, payload})
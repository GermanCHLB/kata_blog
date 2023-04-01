import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import classes from './App.module.scss'
import Header from './Header/Header'
import ArticlesPage from './ArticlesPage/ArticlesPage'
import ArticlePage from './ArticlePage/ArticlePage'
import SignUpPage from './SignUpPage/SignUpPage'
import SignInPage from './SignInPage/SignInPage'
import ProfilePage from './ProfilePage/ProfilePage'
import { setUserAction } from './reducer'
import NewArticlePage from './NewArticlePage/NewArticlePage'
import EditArticlePage from './EditArticlePage/EditArticlePage'

function App() {
  const dispatch = useDispatch()
  const userData = localStorage.getItem('user')
  if (userData !== null) {
    dispatch(setUserAction(JSON.parse(userData)))
  }

  return (
    <Router>
      <div className={classes.App}>
        <Header isAuthorized={false} />
        <Route path={'/articles'} component={ArticlesPage} exact />
        <Route path={'/'} component={ArticlesPage} exact />
        <Route
          path={'/articles/:slug'}
          render={({ match }) => {
            const { slug } = match.params
            return <ArticlePage slug={slug} />
          }}
          exact
        />
        <Route path={'/sign-up'} component={SignUpPage} />
        <Route path={'/sign-in'} component={SignInPage} />
        <Route path={'/profile'} component={ProfilePage} />
        <Route path={'/new-article'} component={NewArticlePage} />
        <Route
          path={'/articles/:slug/edit'}
          render={({ match }) => {
            const { slug } = match.params
            return <EditArticlePage slug={slug} />
          }}
        />
      </div>
    </Router>
  )
}

export default App

import classes from './App.module.scss';
import Header from "./Header/Header";
import ArticlesPage from "./ArticlesPage/ArticlesPage";

import {BrowserRouter as Router, Route} from "react-router-dom";
import {useSelector} from "react-redux";
import ArticlePage from "./ArticlePage/ArticlePage";

function App() {
  const articles = useSelector(state => state.articles);

  return (
    <Router>
      <div className={classes.App}>
        <Header isAuthorized={false}/>
        <Route path={'/articles'} component={ArticlesPage} exact/>
        <Route path={'/'} component={ArticlesPage} exact/>
        <Route
          path={'/articles/:slug'}
          render={({match}) => {
            const {slug} = match.params;
            return <ArticlePage slug={slug}/>
          }}
        />
      </div>
    </Router>
  );
}

export default App;

import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom'; 

import Articles from './components/articles';
import Welcome from './components/welcome';
import CreateArticle from './components/create-article';

const App =()=> {
    return (
        <>
            {/* <NavBar /> */}
            <Switch>
                <Route exact path="/" component={Welcome}/>
                <Route path="/articles" component={Articles}/>
                <Route path="/create-article" component={CreateArticle}/>
            </Switch>
        </>
    )
}

export default withRouter(App);
import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom'; 

import Articles from './components/articles';
import Welcome from './components/welcome';
import Create from './components/create';
import Article from './components/show-article';

const App =()=> {
    return (
        <>
            {/* <NavBar /> */}
            <Switch>
                <Route exact path="/" component={Welcome}/>
                <Route path="/articles/:articleId" component={Article}/>
                <Route path="/articles" component={Articles}/>
                <Route path="/create" component={Create}/>
            </Switch>
        </>
    )
}

export default withRouter(App);
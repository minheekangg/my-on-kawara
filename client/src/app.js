import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom'; 

import Articles from './components/articles';
import Welcome from './components/welcome';
import Create from './components/create';
import Edit from './components/edit';
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
                <Route path="/edit/:articleId" component={Edit}/>
            </Switch>
        </>
    )
}

export default withRouter(App);
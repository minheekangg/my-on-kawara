import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'; 

import Articles from './components/articles';
import Create from './components/create';
import Edit from './components/edit';
import Article from './components/show-article';

const App =()=> {
    return (
        <>
            {/* <NavBar /> */}
            <Switch>
                <Route exact path="/" render={() => <Redirect to="/articles" />}/>
                <Route path="/articles/:articleId" component={Article}/>
                <Route path="/articles" component={Articles}/>
                <Route path="/create" component={Create}/>
                <Route path="/edit/:articleId" component={Edit}/>
                <Route path="/edit" component={(props)=> <Articles toEdit={true} {...props}/>} />
            </Switch>
        </>
    )
}

export default withRouter(App);
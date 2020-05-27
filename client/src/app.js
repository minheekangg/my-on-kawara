import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom'; 

import Articles from './components/articles';
import Welcome from './components/welcome';
import CreateArticle from './components/create';
import CreatePhoto from './components/create/photo' //TODO: remove later

const App =()=> {
    return (
        <>
            {/* <NavBar /> */}
            <Switch>
                <Route exact path="/" component={Welcome}/>
                <Route path="/articles" component={Articles}/>
                <Route path="/create-article" component={CreateArticle}/>
                <Route path="/create-photo" component={CreatePhoto}/>
            </Switch>
        </>
    )
}

export default withRouter(App);
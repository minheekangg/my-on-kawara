import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom'; 

import Articles from './components/articles';
import Welcome from './components/welcome';
import SamplePost from './components/sample-post';

const App =()=> {
    return (
        <>
            {/* <NavBar /> */}
            <Switch>
                <Route exact path="/" component={Welcome}/>
                <Route path="/articles" component={Articles}/>
                <Route path="/post" component={SamplePost}/>
            </Switch>
        </>
    )
}

export default withRouter(App);
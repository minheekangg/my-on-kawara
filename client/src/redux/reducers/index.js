import { combineReducers } from 'redux'; // Pure JavaScript
import userReducer from './userReducer';
import articlesReducer from './articlesReducer';
import articleReducer from './articleReducer';
import destinationReducer from './destinationReducer';
import tripReducer from './tripReducer';
import createReducer from './createReducer';

export default combineReducers({
    user: userReducer,
    articles: articlesReducer,
    article: articleReducer,
    destination: destinationReducer,
    trip: tripReducer,
    create: createReducer,
})
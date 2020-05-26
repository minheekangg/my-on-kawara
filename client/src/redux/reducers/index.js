import { combineReducers } from 'redux'; // Pure JavaScript
import userReducer from './userReducer';
import articlesReducer from './articlesReducer';
import createReducer from './createReducer';
import tripReducer from './tripReducer';

export default combineReducers({
    user: userReducer,
    articles: articlesReducer,
    create: createReducer,
    trip: tripReducer
})
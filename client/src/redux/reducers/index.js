import { combineReducers } from 'redux'; // Pure JavaScript
import userReducer from './userReducer';
import articlesReducer from './articlesReducer';
import createReducer from './createReducer';

export default combineReducers({
    user: userReducer,
    articles: articlesReducer,
    create: createReducer
})
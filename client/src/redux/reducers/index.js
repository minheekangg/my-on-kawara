import { combineReducers } from 'redux'; // Pure JavaScript
import userReducer from './userReducer';
import articlesReducer from './articlesReducer';

export default combineReducers({
    user: userReducer,
    articles: articlesReducer,
})
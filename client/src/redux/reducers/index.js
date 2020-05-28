import { combineReducers } from 'redux'; // Pure JavaScript
import userReducer from './userReducer';
import articlesReducer from './articlesReducer';
import destinationReducer from './destinationReducer';
import tripReducer from './tripReducer';
import createReducer from './createReducer';

export default combineReducers({
    user: userReducer,
    articles: articlesReducer,
    destination: destinationReducer,
    trip: tripReducer,
    create: createReducer,
})
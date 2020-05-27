import { combineReducers } from 'redux'; // Pure JavaScript
import userReducer from './userReducer';
import articlesReducer from './articlesReducer';
import destinationReducer from './destinationReducer';
import tripReducer from './tripReducer';

export default combineReducers({
    user: userReducer,
    articles: articlesReducer,
    destination: destinationReducer,
    trip: tripReducer
})
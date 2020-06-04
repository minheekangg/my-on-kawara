import { combineReducers } from 'redux';
// import userReducer from './userReducer';
import articlesReducer from './articlesReducer';
import destinationReducer from './destinationReducer';
import tripReducer from './tripReducer';
import photoReducer from './photoReducer';

export default combineReducers({
    // user: userReducer,
    articles: articlesReducer,
    destination: destinationReducer,
    trip: tripReducer,
    photo: photoReducer,
})
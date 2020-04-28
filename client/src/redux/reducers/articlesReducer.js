import { ActionTypes } from 'utils/constants';

const initialState = {
};


export default function articlesReducer(state = initialState, action) {
    console.log('%c articlesReducer', 'color: blue', state, action);
    switch (action.type) {
        case ActionTypes.FETCH_ARTICLES + '_PENDING': {
            return {
                fetching: true
            };
        }
        case ActionTypes.FETCH_ARTICLES + '_REJECTED': {
            // const error = getErrorMsg(action);
            // const code = getErrorStatusCode(action);

            // if (code === 404) {
            //     return {
            //         ...state,
            //         fetched: true,
            //         fetching: false
            //     };
            // }

            return {
                fetching: false,
                fetched: true,
                error
            };
        }
        case ActionTypes.FETCH_ARTICLES + '_FULFILLED': {
            const articles = action.payload.articles;

            return {
                ...state,
                fetched: true,
                fetching: false,
                ...articles
            };
        }
        case RESET:
            return initialState
        default:
            return state;
    }
}
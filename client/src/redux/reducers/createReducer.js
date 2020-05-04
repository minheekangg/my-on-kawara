import { ActionTypes } from '../../utils/constants';

const initialState = {
};

export default function createReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.UPDATE_PROP: {
            return {
                ...state,
                ...action.payload,
            };
        }
        // case ActionTypes.FETCH_ARTICLES + '_REJECTED': {
        //     const error = action.payload.error;
        //     // const code = getErrorStatusCode(action);

        //     // if (code === 404) {
        //     //     return {
        //     //         ...state,
        //     //         fetched: true,
        //     //         fetching: false
        //     //     };
        //     // }

        //     return {
        //         fetching: false,
        //         fetched: true,
        //         error
        //     };
        // }
        // case ActionTypes.FETCH_ARTICLES + '_FULFILLED': {
        //     const articles = action.payload;

        //     return {
        //         ...state,
        //         fetched: true,
        //         fetching: false,
        //         articles
        //     };
        // }
        case ActionTypes.RESET:
            return initialState
        default:
            return state;
    }
}
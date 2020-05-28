import { ActionTypes } from '../../utils/constants';

const initialState = {
};

export default function articlesReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.FETCH_ARTICLE + '_PENDING': {
            return {
                fetching: true
            };
        }
        case ActionTypes.FETCH_ARTICLE + '_REJECTED': {
            const error = action.payload.error;

            return {
                fetching: false,
                fetched: true,
                error
            };
        }
        case ActionTypes.FETCH_ARTICLE + '_FULFILLED': {
            const article = action.payload;

            return {
                ...state,
                fetched: true,
                fetching: false,
                article
            };
        }
        case ActionTypes.RESET:
            return initialState
        default:
            return state;
    }
}
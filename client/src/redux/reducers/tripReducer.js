import { ActionTypes } from '../../utils/constants';

const initialState = {
};

export default function tripReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.CREATE_TRIP + '_PENDING': {
            return {
                ...state,
                creating: true,
            };
        }
        case ActionTypes.CREATE_TRIP + '_REJECTED': {
            const error = action.payload && action.payload.response && action.payload.response.data;

            return {
                creating: false,
                created: false,
                error
            };
        }
        case ActionTypes.FETCH_ARTICLES + '_FULFILLED': {
            debugger
            const articles = action.payload;

            return {
                ...state,
                created: true,
                creating: false,
                articles
            };
        }
        case ActionTypes.RESET:
            return initialState
        default:
            return state;
    }
}
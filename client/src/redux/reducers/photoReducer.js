import { ActionTypes } from '../../utils/constants';

const initialState = {
};

export default function createReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.CREATE_PHOTO + '_PENDING': {
            return {
                ...state,
                creating: true,
            };
        }
        case ActionTypes.CREATE_PHOTO + '_REJECTED': {
            const error = action.payload && action.payload.response && action.payload.response.data;

            return {
                creating: false,
                created: false,
                error
            };
        }
        case ActionTypes.CREATE_PHOTO + '_FULFILLED': {
            return {
                ...state,
                created: true,
                creating: false,
            };
        }
        case ActionTypes.RESET:
            return initialState
        default:
            return state;
    }
}
import { ActionTypes } from '../../utils/constants';

const initialState = {
    isCreating: false
};

export default function createReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.SET_CREATE_STICKER: {
            const isCreating = !state.isCreating;
            return {
                ...state,
                isCreating,
            };
        }
        case ActionTypes.CREATE_STICKER + '_PENDING': {
            return {
                ...state,
                creating: true,
            };
        }
        case ActionTypes.CREATE_STICKER + '_REJECTED': {
            const error = action.payload && action.payload.response && action.payload.response.data;

            return {
                creating: false,
                created: false,
                error
            };
        }
        case ActionTypes.CREATE_STICKER + '_FULFILLED': {
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
import { ActionTypes } from '../../utils/constants';

const initialState = {
    isCreating: false,
    updating: false,
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
        case ActionTypes.DELETE_STICKER + '_PENDING': 
        case ActionTypes.CREATE_STICKER + '_PENDING': {
            return {
                ...state,
                updating: true,
            };
        }
        case ActionTypes.DELETE_STICKER + '_REJECTED': 
        case ActionTypes.CREATE_STICKER + '_REJECTED': {
            const error = action.payload && action.payload.response && action.payload.response.data;

            return {
                updating: false,
                updated: false,
                error
            };
        }
        case ActionTypes.DELETE_STICKER + '_FULFILLED': 
        case ActionTypes.CREATE_STICKER + '_FULFILLED': {
            return {
                ...state,
                updated: true,
                updating: false,
            };
        }
        case ActionTypes.RESET:
            return initialState
        default:
            return state;
    }
}
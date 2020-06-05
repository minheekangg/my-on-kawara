import { ActionTypes } from '../../utils/constants';

const initialState = {
    updating: false
};

export default function createReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.CREATE_PHOTO + '_PENDING': {
            return {
                ...state,
                updating: true,
            };
        }
        case ActionTypes.CREATE_PHOTO + '_REJECTED': {
            const error = action.payload && action.payload.response && action.payload.response.data;

            return {
                updating: false,
                updated: false,
                error
            };
        }
        case ActionTypes.CREATE_PHOTO + '_FULFILLED': {
            return {
                ...state,
                updated: true,
                updating: false,
            };
        }
        case ActionTypes.DELETE_PHOTO + '_PENDING': {
            return {
                ...state,
                updating: true,
            };
        }
        case ActionTypes.DELETE_PHOTO + '_REJECTED': {
            const error = action.payload && action.payload.response && action.payload.response.data;

            return {
                updating: false,
                updated: false,
                error
            };
        }
        case ActionTypes.DELETE_PHOTO + '_FULFILLED': {
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
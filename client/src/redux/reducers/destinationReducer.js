import { ActionTypes } from '../../utils/constants';

const initialState = {
};

export default function destinationReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.UPDATE_PROP: {
            return {
                ...state,
                ...action.payload,
            };
        }
        case ActionTypes.CREATE_DESTINATIONS + '_PENDING': {
            return {
                ...state,
                fetching: true,
            };
        }
        case ActionTypes.CREATE_DESTINATIONS + '_REJECTED': {
            debugger
            const error = action.payload && action.payload.response && action.payload.response.data;

            return {
                fetching: false,
                fetched: false,
                error
            };
        }
        case ActionTypes.CREATE_DESTINATIONS + '_FULFILLED': {
            debugger
            const destinations = action.payload;

            return {
                ...state,
                fetched: true,
                fetching: false,
                destinations
            };
        }
        case ActionTypes.RESET:
            return initialState
        default:
            return state;
    }
}
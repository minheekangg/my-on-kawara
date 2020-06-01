import { ActionTypes } from '../../utils/constants';

const initialState = {
};

export default function tripReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.CREATE_TRIP + '_PENDING': {
            return {
                ...state,
                fetching: true,
            };
        }
        case ActionTypes.CREATE_TRIP + '_REJECTED': 
        case ActionTypes.CREATE_DESTINATIONS + '_REJECTED': {
            const error = action.payload && action.payload.response && action.payload.response.data;

            return {
                fetching: false,
                fetched: false,
                error
            };
        }
        case ActionTypes.CREATE_TRIP + '_FULFILLED': 
        case ActionTypes.CREATE_DESTINATIONS + '_FULFILLED': {
            const trip = action.payload.trip;

            return {
                ...state,
                fetched: true,
                fetching: false,
                trip
            };
        }
        case ActionTypes.RESET:
            return initialState
        default:
            return state;
    }
}
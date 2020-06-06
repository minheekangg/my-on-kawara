import { ActionTypes } from '../../utils/constants';

const initialState = {
};

export default function tripReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.CREATE_TRIP + '_PENDING': 
        case ActionTypes.DELETE_TRIP + '_PENDING': 
        case ActionTypes.UPDATE_TRIP + '_PENDING': {
            return {
                ...state,
                fetching: true,
            };
        }
        case ActionTypes.CREATE_TRIP + '_REJECTED': 
        case ActionTypes.UPDATE_TRIP + '_REJECTED': 
        case ActionTypes.DELETE_TRIP + '_REJECTED': 
        case ActionTypes.CREATE_DESTINATIONS + '_REJECTED': {
            const error = action.payload && action.payload.response && action.payload.response.data;

            return {
                fetching: false,
                fetched: false,
                error
            };
        }
        case ActionTypes.CREATE_TRIP + '_FULFILLED': 
        case ActionTypes.UPDATE_TRIP + '_FULFILLED': 
        case ActionTypes.CREATE_DESTINATIONS + '_FULFILLED': {
            const trip = action.payload.trip;

            return {
                ...state,
                fetched: true,
                fetching: false,
                trip
            };
        }
        case ActionTypes.FETCH_TRIP + '_PENDING': {
            return {
                fetching: true
            };
        }
        case ActionTypes.FETCH_TRIP + '_REJECTED': {
            const error = action.payload.error;

            return {
                fetching: false,
                fetched: true,
                error
            };
        }
        case ActionTypes.FETCH_TRIP + '_FULFILLED': {
            const trip = action.payload;

            return {
                ...state,
                fetched: true,
                fetching: false,
                trip
            };
        }
        case ActionTypes.UPDATE_PROP: {
            const newTrip = {
                ...action.payload,
                ...state.newTrip
            }
            return {
                ...state,
                newTrip
            }
        }
        case ActionTypes.DELETE_TRIP + '_FULFILLED': {
            return {
                ...state,
                fetched: true,
                fetching: false,
                deleted: true,
                trip: {},
            };
        }
        case ActionTypes.RESET:
            return initialState
        default:
            return state;
    }
}
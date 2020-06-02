import { ActionTypes } from '../../utils/constants';

const initialState = {
};

export default function destinationReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.CREATE_DESTINATIONS + '_PENDING': {
            return {
                ...state,
                fetching: true,
            };
        }
        case ActionTypes.CREATE_DESTINATIONS + '_REJECTED': {
            const error = action.payload && action.payload.response && action.payload.response.data;

            return {
                fetching: false,
                fetched: false,
                error
            };
        }
        case ActionTypes.CREATE_DESTINATIONS + '_FULFILLED': {
            const destinations = action.payload.destinations;

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
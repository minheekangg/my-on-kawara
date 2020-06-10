import { ActionTypes } from '../../utils/constants';
import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL || 'http://localhost:8000';

export const updateProp = (payload) => {
    return (dispatch) => {
        dispatch(
            { type: ActionTypes.UPDATE_PROP, payload }
        )
    }
}

export const updateTrip = payload => {    
    return (dispatch, getState) => {
        dispatch({ type: ActionTypes.UPDATE_TRIP + "_PENDING" });

        let tripId = payload.tripId
        if (!tripId) {
            const state = getState();
            tripId = state && state.trip && state.trip.trip._id;
            
            if (!tripId) {
                const err = 'trip is missing';
                
                dispatch({
                    type: ActionTypes.UPDATE_TRIP + "_REJECTED",
                    payload: err,
                });
            }

        }

        return axios
            .patch(`${baseURL}/api/trips/${tripId}`, {
                headers: {
                    // Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                    "Content-Type": "application/json",
                    accept: "application/json"
                },
                data: {...payload}
            })
            .then((r) => {
                if (r && r.data && r.data.trip) {
                    dispatch({
                        type: ActionTypes.UPDATE_TRIP + "_FULFILLED",
                        payload: r.data,
                    });
                }
            })
            .catch((err) => {
                dispatch({
                    type: ActionTypes.UPDATE_TRIP + "_REJECTED",
                    payload: err,
                });
            });
    };
}
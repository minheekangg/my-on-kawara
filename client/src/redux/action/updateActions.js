import { ActionTypes } from '../../utils/constants';
import axios from "axios";

export const updateProp = (payload) => {
    return (dispatch) => {
        dispatch(
            { type: ActionTypes.UPDATE_PROP, payload }
        )
    }
}

export const updateTrip = payload => {
    console.log('id is', payload);
    
    return (dispatch, getState) => {
        dispatch({ type: ActionTypes.UPDATE_ARTICLE + "_PENDING" });

        if (!payload.articleId) {
            const state = getState();
            const tripId = state && state.trip && state.trip.trip._id;
            
            if (!tripId) {
                const err = 'trip is missing';
                
                dispatch({
                    type: ActionTypes.UPDATE_ARTICLE + "_REJECTED",
                    payload: err,
                });
            }

        }

        return axios
            .patch(`http://localhost:8000/api/trips/${payload.articleId}`, {
                headers: {
                    // Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                    "Content-Type": "application/json",
                    accept: "application/json"
                },
                data: {...payload}
            })
            .then((r) => {
                debugger
                if (r && r.data && r.data.trip) {
                    dispatch({
                        type: ActionTypes.UPDATE_ARTICLE + "_FULFILLED",
                        payload: r.data,
                    });
                }
            })
            .catch((err) => {
                dispatch({
                    type: ActionTypes.UPDATE_ARTICLE + "_REJECTED",
                    payload: err,
                });
            });
    };
}
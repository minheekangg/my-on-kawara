import { ActionTypes } from '../../utils/constants';
import axios from "axios";


const baseURL = process.env.REACT_APP_FIXIE_URL || 'http://localhost:8000';

export const deleteTrip = id => {    
    return (dispatch) => {
        dispatch({ type: ActionTypes.DELETE_TRIP + "_PENDING" });

        return axios
            .delete(`${baseURL}/api/trips/${id}`, {
                headers: {
                    // Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                    "Content-Type": "application/json",
                    accept: "application/json"
                },
            })
            .then((r) => {
                if (r && r.status === 200) {
                    dispatch({
                        type: ActionTypes.DELETE_TRIP + "_FULFILLED",
                    });
                }
            })
            .catch((err) => {
                dispatch({
                    type: ActionTypes.DELETE_TRIP + "_REJECTED",
                    payload: err,
                });
            });
    };
}

export const deletePhoto = (id, tripId) => {    
    return (dispatch, getState) => {
        dispatch({ type: ActionTypes.DELETE_PHOTO + "_PENDING" });

        if (!tripId) {
            const state = getState();
            let tripId = state && state.trip && state.trip.trip._id;
            
            if (!tripId) {
                const err = 'trip is missing';
                
                dispatch({
                    type: ActionTypes.DELETE_PHOTO + "_REJECTED",
                    payload: err,
                });
            }

        }
        
        return axios
            .delete(`${baseURL}/api/photos/${id}`, {
                headers: {
                    // Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                    "Content-Type": "application/json",
                    accept: "application/json"
                },
                data: {tripId: tripId}
            })
            .then((r) => {
                if (r && r.data && r.data.trip) {
                    dispatch({
                        type: ActionTypes.DELETE_PHOTO + "_FULFILLED",
                        payload: r.data,
                    });
                }
            })
            .catch((err) => {
                dispatch({
                    type: ActionTypes.DELETE_PHOTO + "_REJECTED",
                    payload: err,
                });
            });
    };
}

export const deleteSticker = (id, tripId) => {    
    return (dispatch, getState) => {
        dispatch({ type: ActionTypes.DELETE_STICKER + "_PENDING" });

        if (!tripId) {
            const state = getState();
            let tripId = state && state.trip && state.trip.trip._id;
            
            if (!tripId) {
                const err = 'trip is missing';
                
                dispatch({
                    type: ActionTypes.DELETE_STICKER + "_REJECTED",
                    payload: err,
                });
            }
        }
        
        return axios
            .delete(`${baseURL}/api/stickers/${id}`, {
                headers: {
                    // Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                    "Content-Type": "application/json",
                    accept: "application/json"
                },
                data: {tripId: tripId}
            })
            .then((r) => {
                if (r && r.data && r.data.trip) {
                    dispatch({
                        type: ActionTypes.DELETE_STICKER + "_FULFILLED",
                        payload: r.data,
                    });
                }
            })
            .catch((err) => {
                dispatch({
                    type: ActionTypes.DELETE_STICKER + "_REJECTED",
                    payload: err,
                });
            });
    };
}
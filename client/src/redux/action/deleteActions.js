import { ActionTypes } from '../../utils/constants';
import axios from "axios";

export const deleteTrip = payload => {    
    // return (dispatch, getState) => {
    //     dispatch({ type: ActionTypes.UPDATE_TRIP + "_PENDING" });

    //     let tripId = payload.tripId
    //     if (!tripId) {
    //         const state = getState();
    //         tripId = state && state.trip && state.trip.trip._id;
            
    //         if (!tripId) {
    //             const err = 'trip is missing';
                
    //             dispatch({
    //                 type: ActionTypes.UPDATE_TRIP + "_REJECTED",
    //                 payload: err,
    //             });
    //         }

    //     }

    //     return axios
    //         .patch(`http://localhost:8000/api/trips/${tripId}`, {
    //             headers: {
    //                 // Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    //                 "Content-Type": "application/json",
    //                 accept: "application/json"
    //             },
    //             data: {...payload}
    //         })
    //         .then((r) => {
    //             if (r && r.data && r.data.trip) {
    //                 dispatch({
    //                     type: ActionTypes.UPDATE_TRIP + "_FULFILLED",
    //                     payload: r.data,
    //                 });
    //             }
    //         })
    //         .catch((err) => {
    //             dispatch({
    //                 type: ActionTypes.UPDATE_TRIP + "_REJECTED",
    //                 payload: err,
    //             });
    //         });
    // };
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
            .delete(`http://localhost:8000/api/photos/${id}`, {
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
            .delete(`http://localhost:8000/api/stickers/${id}`, {
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
import { ActionTypes } from '../../utils/constants';
import axios from "axios";

export const createDestinations = (destinations) => {
    return (dispatch, getState) => {
        dispatch({ type: ActionTypes.CREATE_DESTINATIONS + "_PENDING" });

        let tripId = destinations.tripId;

        if (!tripId) {
            const state = getState();
            tripId = state && state.trip && state.trip.trip._id;

            if (!tripId) {
                const err = 'trip is missing';
    
                dispatch({
                    type: ActionTypes.CREATE_DESTINATIONS + "_REJECTED",
                    payload: err,
                });
            }
        }


        return axios
            .post("http://localhost:8000/api/destinations", {
                headers: {
                    // Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                    "Content-Type": "application/json",
                    accept: "application/json"
                },
                data: { destinations, tripId }
            })
            .then((r) => {
                if (r && r.data && r.data.destinations && r.data.destinations.length > 0) {
                    dispatch({
                        type: ActionTypes.CREATE_DESTINATIONS + "_FULFILLED",
                        payload: r.data,
                    });
                }
            })
            .catch((err) => {
                dispatch({
                    type: ActionTypes.CREATE_DESTINATIONS + "_REJECTED",
                    payload: err,
                });
            });
    };
};

export const createTrip = payload => {
    return (dispatch) => {
        dispatch({ type: ActionTypes.CREATE_TRIP + "_PENDING" });
        return axios
            .post("http://localhost:8000/api/trips", {
                headers: {
                    // Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                    "Content-Type": "application/json",
                    accept: "application/json"
                },
                data: payload
            })
            .then((r) => {
                if (r && r.data && r.data.trip) {
                    dispatch({
                        type: ActionTypes.CREATE_TRIP + "_FULFILLED",
                        payload: r.data,
                    });
                }
            })
            .catch((err) => {
                dispatch({
                    type: ActionTypes.CREATE_TRIP + "_REJECTED",
                    payload: err,
                });
            });
    };
}

export const createPhotos = payload => {
    
    return (dispatch, getState) => {
        dispatch({ type: ActionTypes.CREATE_PHOTO + "_PENDING" });

        let tripId = payload.tripId;
        
        if (!tripId) {
            
            const state = getState();
            tripId = state && state.trip && state.trip.trip._id;

            if (!tripId) {
                const err = 'trip is missing';
    
                dispatch({
                    type: ActionTypes.CREATE_PHOTO + "_REJECTED",
                    payload: err,
                });
            }
        }

        return axios
            .post("http://localhost:8000/api/photos", {
                headers: {
                    // Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                    "Content-Type": "application/json",
                    accept: "application/json"
                },
                data: {...payload, tripId}
            })
            .then((r) => {
                if (r && r.data) {
                    dispatch({
                        type: ActionTypes.CREATE_PHOTO + "_FULFILLED",
                        payload: r.data,
                    });
                }
            })
            .catch((err) => {
                dispatch({
                    type: ActionTypes.CREATE_PHOTO + "_REJECTED",
                    payload: err,
                });
            });
    };
}

export const setCreateSticker = () => {
    return (dispatch) => {
        dispatch(
            { type: ActionTypes.SET_CREATE_STICKER }
        )
    }
}

export const createSticker = payload => {
    return (dispatch, getState) => {
        dispatch({ type: ActionTypes.CREATE_STICKER + "_PENDING" });

        let tripId = payload.tripId;
        
        if (!tripId) {     
            const state = getState();
            tripId = state && state.trip && state.trip.trip._id;

            if (!tripId) {
                const err = 'trip is missing';
    
                dispatch({
                    type: ActionTypes.CREATE_STICKER + "_REJECTED",
                    payload: err,
                });
            }
        }

        return axios
            .post("http://localhost:8000/api/stickers", {
                headers: {
                    // Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                    "Content-Type": "application/json",
                    accept: "application/json"
                },
                data: payload,
            })
            .then((r) => {
                if (r && r.data) {
                    dispatch({
                        type: ActionTypes.CREATE_STICKER + "_FULFILLED",
                        payload: r.data,
                    });
                }
            })
            .catch((err) => {
                dispatch({
                    type: ActionTypes.CREATE_STICKER + "_REJECTED",
                    payload: err,
                });
            });
    };
}

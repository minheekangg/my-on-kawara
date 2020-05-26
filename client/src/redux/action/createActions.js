import { ActionTypes } from '../../utils/constants';
import axios from "axios";

export const createDestinations = (destinations) => {
    return (dispatch) => {
        dispatch({ type: ActionTypes.CREATE_DESTINATIONS + "_PENDING" });
        return axios
            .post("http://localhost:8000/api/destinations", {
                headers: {
                    // Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                    "Content-Type": "application/json",
                    // accept: "application/json"
                },
                data: [...destinations]
            })
            .then((r) => {
                if (r && r.data && r.data.destinations && !!r.data.destinations.length) {
                    dispatch({
                        type: ActionTypes.CREATE_DESTINATIONS + "_FULFILLED",
                        payload: r.data.trip,
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

export const updateProp = (payload) => {
    debugger
    return (dispatch) => {
        dispatch(
            { type: ActionTypes.UPDATE_PROP, payload }
        )
    }
}

export const createDestination = payload => {
    return (dispatch) => {
        dispatch({ type: ActionTypes.CREATE_TRIP + "_PENDING" });
        return axios
            .post("http://localhost:8000/api/trips", {
                headers: {
                    // Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                    "Content-Type": "application/json",
                    // accept: "application/json"
                },
                data: payload
            })
            .then((r) => {
                debugger
                // if (r && r.data && r.data.destinations && !!r.data.destinations.length) {
                //     dispatch({
                //         type: ActionTypes.CREATE_TRIP + "_FULFILLED",
                //         payload: r.data.trip,
                //     });
                // }
            })
            .catch((err) => {
                dispatch({
                    type: ActionTypes.CREATE_TRIP + "_REJECTED",
                    payload: err,
                });
            });
    };
}

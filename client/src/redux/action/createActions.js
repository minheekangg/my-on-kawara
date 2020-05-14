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
                debugger;
                if (r && r.data && r.data.trip && !!r.data.trip.length) {
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
    return (dispatch) => {
        dispatch(
            { type: ActionTypes.UPDATE_PROP, payload }
        )
    }
}

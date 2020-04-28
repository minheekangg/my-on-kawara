import { ActionTypes } from '../../utils/constants';
import axios from 'axios';

export const fetchArticles = () => {
    return (dispatch) => {
        dispatch(
            { type: ActionTypes.FETCH_ARTICLES + '_PENDING' }
        )
        return axios.get(
            "http://localhost:8000/api/trips",
            {
                headers: {
                    // Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                    "Content-Type": "application/json",
                    // accept: "application/json"
                }
            })
            .then(r => {
                if (r && r.data && r.data.trip && !!r.data.trip.length) {
                    dispatch({ type: ActionTypes.FETCH_ARTICLES + '_FULFILLED', payload: r.data.trip });
                }
            })
            .catch(err=> {
                dispatch({ type: ActionTypes.FETCH_ARTICLES + '_REJECTED', payload: err });
            })
    }
}
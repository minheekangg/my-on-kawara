import { ActionTypes } from 'utils/constants';
import axios from 'axios';

export const fetchArticles = () => {
    return (dispatch) => {
        dispatch(
            { type: ActionTypes.FETCH_ARTICLES + '_PENDING' }
        )
        return axios.get(
            `${process.env.REACT_APP_SERVER}/api/articles`,
            {
                headers: {
                    // Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                    "content-type": "application/json",
                    accept: "application/json"
                }
            }
        )
            .then(r => r.json())
            .then(articles => {
                dispatch({ type: ActionTypes.FETCH_ARTICLES + '_FULFILLED', payload: articles });
            })
            .catch(err=> {
                dispatch({ type: ActionTypes.FETCH_ARTICLES + '_FULFILLED', payload: err });
            })
    }
}
}
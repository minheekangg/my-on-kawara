import { ActionTypes } from '../../utils/constants';
import axios from "axios";

export const updateProp = (payload) => {
    return (dispatch) => {
        dispatch(
            { type: ActionTypes.UPDATE_PROP, payload }
        )
    }
}
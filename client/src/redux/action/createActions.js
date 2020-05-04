import { ActionTypes } from '../../utils/constants';

export const updateProp = (payload) => {
    return (dispatch) => {
        dispatch(
            { type: ActionTypes.UPDATE_PROP, payload }
        )
    }
}
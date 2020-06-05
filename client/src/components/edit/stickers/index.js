import { connect } from 'react-redux';
import PhotosList from './photos-list';

import { setCreateSticker } from 'redux/action/createActions';
import { deleteSticker } from 'redux/action/deleteActions';

const mapStateToProps = (state, ownProps) => {
    const trip = state.trip && state.trip.trip;
    return {
        photos: (trip && trip.stickers) || [],
        tripId: (trip && trip._id) || "",
        isCreating: state.stickers && !!state.stickers.isCreating,
        updating: (state.stickers && state.stickers.updating) || false,
        updated: (state.stickers && state.stickers.updated) || false,
        ...ownProps
    }
};

const actions = {
    deleteSticker,
    setCreateSticker,
}

export default connect(mapStateToProps, actions)(
    PhotosList
);
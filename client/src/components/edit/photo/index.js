import { connect } from 'react-redux';
import PhotosList from './photos-list';

import { deletePhoto } from 'redux/action/deleteActions';
import { updatePhoto } from 'redux/action/updateActions';

const mapStateToProps = (state, ownProps) => {
    const trip = state.trip && state.trip.trip;

    return {
        photos: (trip && trip.photos) || [],
        tripId: (trip && trip._id) || "",
        destinations: (trip && trip.destinations) || [],
        startDate: (trip && trip.startDate) || "",
        endDate: (trip && trip.endDate) || "",
        updating: (state.photo && state.photo.updating) || false,
        updated: (state.photo && state.photo.updated) || false,
        ...ownProps
    }
};

const actions = {
    updatePhoto,
    deletePhoto
}


export default connect(mapStateToProps, actions)(
    PhotosList
);
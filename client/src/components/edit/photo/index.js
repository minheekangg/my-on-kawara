import { connect } from 'react-redux';
import PhotosList from './photos-list';

import { deletePhoto } from 'redux/action/deleteActions';

const mapStateToProps = (state, ownProps) => {
    const trip = state.trip && state.trip.trip;

    return {
        photos: (trip && trip.photos) || [],
        tripId: (trip && trip._id) || "",
        updating: (state.photo && state.photo.updating) || false,
        updated: (state.photo && state.photo.updated) || false,
        ...ownProps
    }
};


export default connect(mapStateToProps, { deletePhoto })(
    PhotosList
);
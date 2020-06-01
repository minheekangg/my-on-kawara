import { connect } from 'react-redux';
import CreatePhoto from './create-photo';

import { createPhotos } from "redux/action/createActions";

const mapStateToProps = (state, ownProps) => {
    const trip = state.trip && state.trip.trip;
    const destinations = state.destination && state.destination.destinations;

    return {
        people: (trip && trip.people) || [],
        tripId: (trip && trip._id) || "",
        destinations: destinations || [],
        ...ownProps,
    };
};


export default connect(mapStateToProps, { createPhotos })(
    CreatePhoto
);
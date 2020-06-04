import { connect } from 'react-redux';
import Trip from './trip'

import { updateTrip } from 'redux/action/updateActions';

const mapStateToProps = (state, ownProps) => {
    const trip = state.trip && state.trip.trip;
    return {
        startDate: (trip && trip.startDate) || "",
        endDate: (trip && trip.endDate) || "",
        title: (trip && trip.title) || "",
        content: (trip && trip.content) || "",
        people: (trip && trip.people) || [],
        destinations: (trip && trip.destinations) || [],
        ...ownProps
    }
};

export default connect(mapStateToProps, { updateTrip})(Trip);
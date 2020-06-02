import { connect } from 'react-redux';
import CreateDestinations from './create-destinations';

import { createDestinations } from "redux/action/createActions";

const mapStateToProps = (state, ownProps) => {
    console.log('state is',ownProps)
    return {
        // minDate: (state.trip && state.trip.trip && state.trip.trip.startDate) || new Date(),
        // maxDate: (state.trip && state.trip.trip && state.trip.trip.endDate) || new Date(),
        ...ownProps
    }
};


export default connect(mapStateToProps, { createDestinations })(
    CreateDestinations
);
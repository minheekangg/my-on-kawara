import { connect } from 'react-redux';
import CreatePhoto from '../../create/photo/create-photo';

import { createPhotos } from "redux/action/createActions";

const mapStateToProps = (state, ownProps) => {
  const trip = state.trip && state.trip.trip;
  console.log('trip', trip)
  return {
    people: (trip && trip.people) || [],
    destinations: (trip && trip.destinations) || [],
    tripId: (trip && trip._id) || "",
    ...ownProps
  }
};


export default connect(mapStateToProps, { createPhotos })(CreatePhoto);
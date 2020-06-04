import { connect } from 'react-redux';
import PhotosList from './photos-list';

const mapStateToProps = (state, ownProps) => {
    const trip = state.trip && state.trip.trip;
    return {
        photos: (trip && trip.photos) || [],
        ...ownProps
    }
};


export default connect(mapStateToProps)(
    PhotosList
);
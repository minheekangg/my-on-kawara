import { connect } from 'react-redux';
import PhotosList from './photos-list';

import { setCreateSticker } from 'redux/action/createActions';

const mapStateToProps = (state, ownProps) => {
    const trip = state.trip && state.trip.trip;
    return {
        photos: (trip && trip.stickers) || [],
        ...ownProps
    }
};

export default connect(mapStateToProps, { setCreateSticker })(
    PhotosList
);
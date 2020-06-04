import { connect } from 'react-redux';
import CreateSticker from './create-sticker';

import { createSticker } from 'redux/action/createActions';

const mapStateToProps = (state, ownProps) => {
    const trip = state.trip && state.trip.trip;
    return {
        tripId: (trip && trip._id) || "",
        photos: (trip && trip.stickers) || [],
        isCreating: state.stickers && !!state.stickers.isCreating,
        ...ownProps
    }
};

export default connect(mapStateToProps, { createSticker })(
    CreateSticker
);
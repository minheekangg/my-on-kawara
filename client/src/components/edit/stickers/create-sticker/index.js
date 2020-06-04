import { connect } from 'react-redux';
import CreateSticker from './create-sticker';

const mapStateToProps = (state, ownProps) => {
    const trip = state.trip && state.trip.trip;
    return {
        tripId: (trip && trip._id) || "",
        photos: (trip && trip.stickers) || [],
        ...ownProps
    }
};

export default connect(mapStateToProps)(
    CreateSticker
);
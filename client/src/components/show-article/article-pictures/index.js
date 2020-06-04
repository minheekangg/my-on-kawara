import { connect } from 'react-redux';
import PictureContainer from './picture-container';

const mapStateToProps = (state, ownProps) => (
    {
        trip: (state.trip && state.trip.trip) || {},
        ...ownProps
    }
);

export default connect(mapStateToProps)(PictureContainer);
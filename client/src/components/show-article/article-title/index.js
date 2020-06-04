import { connect } from 'react-redux';
import Title from './title';


const mapStateToProps = (state, ownProps) => (
    {
        trip: (state.trip && state.trip.trip) || {},
        ...ownProps
    }
);

export default connect(mapStateToProps)(Title);
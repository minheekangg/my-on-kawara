import { connect } from 'react-redux';
import DeleteTrip from './delete-trip';

import { deleteTrip } from 'redux/action/deleteActions';

const mapStateToProps = (state, ownProps) => ({
    redirect: state && state.trip && !!state.trip.deleted,
    ...ownProps
});

export default connect(mapStateToProps, { deleteTrip })(
    DeleteTrip
);
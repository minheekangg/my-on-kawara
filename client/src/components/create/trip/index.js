import { connect } from 'react-redux';
import CreateTrip from './create-trip';

import { createTrip } from 'redux/action/createActions';

const mapStateToProps = (state, ownProps) => (
    {
        startDate: (state.create && state.create.startDate) || "",
        endDate: (state.create && state.create.endDate) || "",
        title: (state.create && state.create.title) || "",
        ...ownProps
    }
);

export default connect(mapStateToProps, { createTrip })(CreateTrip);
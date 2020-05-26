import { connect } from 'react-redux';
import CreateDates from './create-dates';

import { createDestination } from 'redux/action/createActions';

const mapStateToProps = (state, ownProps) => (
    {
        startDate: (state.create && state.create.startDate) || "",
        endDate: (state.create && state.create.endDate) || "",
        title: (state.create && state.create.title) || "",
        ...ownProps
    }
);

export default connect(mapStateToProps, { createDestination })(CreateDates);
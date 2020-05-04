import { connect } from 'react-redux';
import CreateDates from './create-dates';

import { updateProp } from 'redux/action/createActions';

const mapStateToProps = (state, ownProps) => (
    {
        startDate: (state.create && state.create.startDate) || "",
        endDate: (state.create && state.create.endDate) || "",
        ...ownProps
    }
);

export default connect(mapStateToProps, { updateProp})(CreateDates);
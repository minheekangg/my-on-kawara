import { connect } from 'react-redux';
import CreateDestinations from './create-destinations';

import { createDestinations } from "redux/action/createActions";

const mapStateToProps = (state, ownProps) => (
    {
        fetched: (state.create && state.create.fetched) || false,
        ...ownProps
    }
);


export default connect(mapStateToProps, { createDestinations })(
    CreateDestinations
);
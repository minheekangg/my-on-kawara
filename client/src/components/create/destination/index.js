import { connect } from 'react-redux';
import CreateDestinations from './create-destinations';

import { createDestinations } from "redux/action/createActions";

const mapStateToProps = (state, ownProps) => (
    {
        fetched: state.create && state.create.fetched,
        destinations: state.destination && state.destination.fetched,
        ...ownProps
    }
);


export default connect(mapStateToProps, { createDestinations })(
    CreateDestinations
);
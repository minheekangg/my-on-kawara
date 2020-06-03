import { connect } from 'react-redux';
import CreateDestinations from './create-destinations';

import { createDestinations } from "redux/action/createActions";

const mapStateToProps = (state, ownProps) => (
    {
        ...ownProps
    }
);


export default connect(mapStateToProps, { createDestinations })(
    CreateDestinations
);
import { connect } from 'react-redux';
import Destinations from './destinations';

const mapStateToProps = (state, ownProps) => (
    {
        ...ownProps,
        destinations: (state.article && state.article.article && state.article.article.destinations) || []
    }
);


export default connect(mapStateToProps)(
    Destinations
);
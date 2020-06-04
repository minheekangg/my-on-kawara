import { connect } from 'react-redux';
import ShowArticle from './show-article';

import { fetchArticle } from 'redux/action/fetchActions';

const mapStateToProps = (state, ownProps) => (
    {
        trip: state.trip,
        fetching: state.trip.fetching,
        fetched: state.trip.fetched,
        ...ownProps
    }
);

export default connect(mapStateToProps, { fetchArticle })(ShowArticle);
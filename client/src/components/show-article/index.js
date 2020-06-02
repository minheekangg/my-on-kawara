import { connect } from 'react-redux';
import ShowArticle from './show-article';

import { fetchArticle } from 'redux/action/fetchActions';

const mapStateToProps = (state, ownProps) => (
    {
        article: state.article,
        fetching: state.article.fetching,
        fetched: state.article.fetched,
        ...ownProps
    }
);

export default connect(mapStateToProps, { fetchArticle })(ShowArticle);
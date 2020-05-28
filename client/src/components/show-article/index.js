import { connect } from 'react-redux';
import ShowArticle from './show-article';

import { fetchArticle } from 'redux/action/articleActions';

const mapStateToProps = (state, ownProps) => (
    {
        article: (state.article && state.articles.article) || [],
        ...ownProps
    }
);

export default connect(mapStateToProps, { fetchArticle })(ShowArticle);
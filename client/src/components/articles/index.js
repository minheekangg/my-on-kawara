import { connect } from 'react-redux';
import Articles from './articles';

import { fetchArticles } from 'redux/action/fetchActions';

const mapStateToProps = (state, ownProps) => (
    {
       articles: (state.articles && state.articles.articles) || [],
        ...ownProps
    }
);

export default connect(mapStateToProps, { fetchArticles })(Articles);
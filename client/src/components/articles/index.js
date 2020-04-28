import { connect } from 'react-redux';
import Articles from './articles';

import { fetchArticles } from '../../redux/action/articleActions';

const mapStateToProps = (state, ownProps) => (
    {
       articles: state.articles && state.articles.articles || [],
        ...ownProps
    }
);

export default connect(mapStateToProps, { fetchArticles })(Articles);
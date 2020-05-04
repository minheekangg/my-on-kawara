import { connect } from 'react-redux';
import CreateDates from './create-dates';

import { fetchArticles } from 'redux/action/articleActions';

const mapStateToProps = (state, ownProps) => (
    {
        articles: (state.articles && state.articles.articles) || [],
        ...ownProps
    }
);

export default connect(mapStateToProps)(CreateDates);
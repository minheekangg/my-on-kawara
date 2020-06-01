import { connect } from 'react-redux';
import Trip from './trip';

const mapStateToProps = (state, ownProps) => {
    const article = state.article && state.article.article;
    return {
        startDate: (article && article.startDate) || "",
        endDate: (article && article.endDate) || "",
        title: (article && article.title) || "",
        content: (article && article.content) || "",
        people: (article && article.people) || [],
        destinations: (article && article.destinations) || [],
        ...ownProps
    }
};

export default connect(mapStateToProps)(Trip);
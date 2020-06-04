import { connect } from 'react-redux';
import PhotosList from './photos-list';

const mapStateToProps = (state, ownProps) => {
    const article = state.article && state.article.article;
    return {
        tripId: (article && article._id) || "",
        ...ownProps
    }
};


export default connect(mapStateToProps)(
    PhotosList
);
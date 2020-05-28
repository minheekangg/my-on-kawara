import { connect } from 'react-redux';
import PictureContainer from './picture-container';

const mapStateToProps = (state, ownProps) => (
    {
        article: (state.article && state.article.article) || {},
        ...ownProps
    }
);

export default connect(mapStateToProps)(PictureContainer);
import { connect } from 'react-redux';
import Title from './title';


const mapStateToProps = (state, ownProps) => (
    {
        article: (state.article && state.article.article) || {},
        ...ownProps
    }
);

export default connect(mapStateToProps)(Title);
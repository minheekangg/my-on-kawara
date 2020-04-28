import { connect } from 'react-redux';
import Articles from './articles';

import { fetchArticles } from '../../redux/action/articleActions';

const mapStateToProps = (state, ownProps) => (
    {
       
        ...ownProps
    }
);

export default connect(mapStateToProps, {fetchArticles})(Articles);
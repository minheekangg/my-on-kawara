import { connect } from "react-redux";
import Edit from "./edit";

import { fetchArticle } from 'redux/action/articleActions';

const mapStateToProps = (state) => ({
    article: state.article,
    fetching: state.article.fetching,
    fetched: state.article.fetched,
});

export default connect(mapStateToProps, { fetchArticle })(Edit);
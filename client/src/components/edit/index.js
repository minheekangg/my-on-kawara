import { connect } from "react-redux";
import Edit from "./edit";

import { fetchArticle } from 'redux/action/fetchActions';
import { updateProp } from 'redux/action/updateActions';

const mapStateToProps = (state) => ({
    article: state.article,
    fetching: state.article.fetching,
    fetched: state.article.fetched,
});

const dispatchAction  = {
    fetchArticle,
    updateProp
}


export default connect(mapStateToProps, dispatchAction)(Edit);
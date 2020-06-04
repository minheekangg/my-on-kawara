import { connect } from "react-redux";
import Edit from "./edit";

import { fetchArticle } from 'redux/action/fetchActions';
import { updateProp } from 'redux/action/updateActions';

const mapStateToProps = (state) => ({
    trip: state.trip,
    fetching: state.trip.fetching,
    fetched: state.trip.fetched,
});

const dispatchAction  = {
    fetchArticle,
    updateProp
}


export default connect(mapStateToProps, dispatchAction)(Edit);
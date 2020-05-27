import { connect } from "react-redux";
import Create from "./create";

const mapStateToProps = (state) => {
    console.log('inside', state.trip.fetched, state.destination.fetched)
    return {
    isTripFetched: state && !!state.trip && state.trip.fetched,
    isDestinationsFetched: state && !!state.destination && state.destination.fetched
}};

export default connect(mapStateToProps)(Create);
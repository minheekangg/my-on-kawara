import { connect } from "react-redux";
import Create from "./create";

const mapStateToProps = (state) => ({
    isTripFetched: state && !!state.trip && state.trip.fetched,
    isDestinationsFetched: state && !!state.destination && state.destination.fetched
});

export default connect(mapStateToProps)(Create);
import { connect } from "react-redux";
import Create from "./create";
import withAuth from "../hoc/withAuth";

const mapStateToProps = (state) => ({
    isTripFetched: state && !!state.trip && state.trip.fetched,
    isDestinationsFetched: state && !!state.destination && state.destination.fetched
});

export default withAuth(connect(mapStateToProps)(Create));
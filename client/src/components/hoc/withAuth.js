import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
// import { fetchCurrentUser } from "../actions/userActions";
import { Loader } from "semantic-ui-react";

const CLIENT_ID = process.env.REACT_APP_OAUTH;

const withAuth = (WrappedComponent) => {
    class AuthorizedComponent extends React.Component {
        componentDidMount() {
            window.gapi.load('client:auth2', ()=> {
                window.gapi.client.init({
                    clientId: CLIENT_ID,
                    scope: 'email'
                })
            })
        }

        render() {
            // // console.log('%c INSIDE RENDER FOR HOC', 'color: green')
            // if (localStorage.getItem('jwt') && this.props.loggedIn) {
            //     return <WrappedComponent {...this.props} />
            // } else if (localStorage.getItem('jwt') && (this.props.authenticatingUser || !this.props.loggedIn)) {
            //     return <Loader active inline="centered" />
            // } else {
            //     return <Redirect to="/login" />
            // }
            return <WrappedComponent {...this.props} />
        }
    }

    const mapStateToProps = (state) => {
        return {
            // loggedIn: state.user.isLoggedIn,
            // authenticatingUser: state.user.authenticatingUser
        }
    }

    // const mapDispatchToProps = { fetchCurrentUser: fetchCurrentUser }

return connect(mapStateToProps)(AuthorizedComponent)
}

export default withAuth

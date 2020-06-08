import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
// import { fetchCurrentUser } from "../actions/userActions";
import { Loader } from "semantic-ui-react";

const CLIENT_ID = process.env.REACT_APP_OAUTH;

const withAuth = (WrappedComponent) => {
    class AuthorizedComponent extends React.Component {
        state = { isSignedIn: null };

        componentDidMount() {
            window.gapi.load('client:auth2', ()=> {
                window.gapi.client.init({
                    clientId: CLIENT_ID,
                    scope: 'email'
                }).then(()=> {
                    this.auth = window.gapi.auth2.getAuthInstance();
                    this.setState({isSignedIn: this.auth.isSignedIn.get()});
                    this.auth.isSignedIn.listen(this.onAuthChange);
                })
            })
        }

        onAuthChange = () => {
            this.setState({isSignedIn: this.auth.isSignedIn.get() })
        }

        render() {
            if ( this.state.isSignedIn === null ) {
                return null;
            } else if (this.state.isSignedIn) {
                return <WrappedComponent {...this.props} />
            } else {
                return <div>should sign in</div>
            }
            // // console.log('%c INSIDE RENDER FOR HOC', 'color: green')
            // if (localStorage.getItem('jwt') && this.props.loggedIn) {
            //     
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

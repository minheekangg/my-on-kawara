import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Loader, Button, Icon } from "semantic-ui-react";

const CLIENT_ID = process.env.REACT_APP_OAUTH;
const ADMIN_EMAIL = process.env.REACT_APP_ADMIN_EMAIL;

const StyledWrapper = styled.div`
    display: flex;
    height: 100vh; 

    .ui.buttons {margin:auto}
`;

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
                    this.onAuthChange();
                    this.auth.isSignedIn.listen(this.onAuthChange);
                })
            })
        }

        onAuthChange = () => {
            this.setState({ isSignedIn: this.auth.isSignedIn.get() })
        }

        onSignIn = () => {
            this.auth.signIn();
        }

        renderSignInOrReturn = () => {
            return <StyledWrapper>
                <Button.Group>
                    <Button icon negative labelPosition='left' onClick={this.onSignIn}>
                        <Icon name='google' />
                            Sign in with Google
                        </Button>
                    <Button.Or />
                    <Button as={Link} to="/articles" icon labelPosition='right'>
                        Return to Articles
                        <Icon name='right arrow' />
                    </Button>
                </Button.Group>
            </StyledWrapper>
        }

        render() {
            if ( this.state.isSignedIn === null ) {
                return <Loader active inline="centered" />;
            } else if (this.state.isSignedIn) {
                if ( this.auth.currentUser.get().getBasicProfile().getEmail() === ADMIN_EMAIL) {
                    return <WrappedComponent {...this.props} />
                } else {
                   return this.renderSignInOrReturn();
                }
            } else {
                return this.renderSignInOrReturn();
            }
        }
    }


return AuthorizedComponent
}

export default withAuth

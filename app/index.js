import React from 'react';

import { initStore } from './store/store';
import { Provider } from 'react-redux';

//Temp
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

import { createRootNavigator } from './router';
import { isSignedIn } from './auth';

const store = initStore();

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            signedIn:      false,
            checkedSignIn: false
        }
    }

    componentDidMount() {
        isSignedIn()
            .then(response => {
                this.setState({
                    signedIn:      response,
                    checkedSignIn: true
                })
            })
            .catch(err =>{
                console.log(
                    'An error occurred checking signed in user: ', err
                )
            });
    }
    render() {
        const { checkedSignIn, signedIn } = this.state;

        if (!checkedSignIn) {
            return null;
        }

        const Layout = createRootNavigator(signedIn);

        return (
            <Provider store={ store }>
                <Layout />
            </Provider>
        );
    }
}
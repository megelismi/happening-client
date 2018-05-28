import React from 'react';

//Temp
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

import {createRootNavigator} from './router';
import {isSignedIn} from './auth';

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
                    'An error occured checking signed in user: ', err
                )
            });
    }
    render() {
        const { checkedSignIn, signedIn } = this.state;

        if (!checkedSignIn) {
            return null;
        }

        const Layout = createRootNavigator(signedIn);

        return <Layout />;
    }
}
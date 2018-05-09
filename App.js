import React from 'react';

import {createStackNavigator} from 'react-navigation';

import Login from './app/components/pages/Login/Login';
import Profile from './app/components/pages/Profile/Profile';

const Application = createStackNavigator({
    Home:    Login,
    Profile: Profile
}, {
    initialRouteName: 'Home',
});

export default class App extends React.Component {

    render() {
        return <Application />;
    }
}
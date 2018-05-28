import React from 'react';

import { SignedIn, SignedOut } from "./app/router";

// const Application = createStackNavigator({
//     Home:    Home,
//     Profile: Profile
// }, {
//     initialRouteName: 'Home',
// });

export default class App extends React.Component {
    render() {
        return <SignedIn />;
    }
}
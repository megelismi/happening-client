import {
    Platform,
    StatusBar
} from "react-native";

import {
    createStackNavigator,
    createBottomTabNavigator,
    createSwitchNavigator
} from "react-navigation";

import Home from "./components/screens/Home/Home";
import Profile from "./components/screens/Profile/Profile";
import SignUp from "./components/screens/Auth/SignUp";
import SignIn from "./components/screens/Auth/SignIn";

import { FontAwesome } from "react-native-vector-icons";

const headerStyle = {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};

export const createRootNavigator = (signedIn = false) => {
    return createSwitchNavigator({
        SignedIn: {
            screen: SignedIn
        },
        SignedOut: {
            screen: SignedOut
        },
    }, {
        initialRouteName: signedIn ? 'SignedIn' : 'SignedOut'
    })
};

export const SignedOut = createStackNavigator({
    SignUp: {
        screen: SignUp,
        navigationOptions: {
            title: "Sign Up"
        }
    },
    SignIn: {
        screen: SignIn,
        navigationOptions: {
            title: "Sign In"
        }
    }
});

export const SignedIn = createBottomTabNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            tabBarLabel: "Home",
            // tabBarIcon: ({ tintColor }) => (
            //     <FontAwesome name="home" size={30} color={tintColor} />
            // )
        }
    },
    Profile: {
        screen: Profile,
        navigationOptions: {
            tabBarLabel: "Profile",
            // tabBarIcon: ({ tintColor }) => (
            //     <FontAwesome name="user" size={30} color={tintColor} />
            // )
        }
    }
});
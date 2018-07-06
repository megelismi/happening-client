import React, { Component } from 'react';

import { Button } from 'react-native-elements';

import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';

export default class Landing extends Component {
    render() {
        return (
            <View style={ styles.container }>
                <View style={ styles.loginContainer }>
                    <Button
                        outline
                        rounded
                        buttonStyle={ styles.loginButton }
                        textStyle={ styles.loginText }
                        title="LOGIN"
                        onPress={ () => this.props.navigation.navigate("SignIn") }
                    />
                </View>

                <View style={ styles.brandingContainer }>
                    <View style={{ alignItems: "center" }}>
                        <Text style={ styles.headerText }>Happening</Text>

                        <Text style={ styles.subHeaderText }>Find more of what you love</Text>

                        <Image
                            style={ styles.headerImage }
                            resizeMode="contain"
                            source={require('../../../assets/images/hot-air-balloon.png')}
                        />
                    </View>

                    <View style={ styles.signUpContainer }>
                        <Button
                            outline
                            containerViewStyle={ styles.signUpButtonContainerView }
                            textStyle={ styles.signUpButtonText }
                            title="Create an Account"
                            onPress={ () => this.props.navigation.navigate("SignUp") }
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    brandingContainer: {
        alignItems: "center",
        justifyContent: "space-evenly",
        height: "100%",
        width: "100%"
    },
    container : {
        flex: 1,
        backgroundColor: "#3939F9",
    },
    loginButton: {
        marginTop: 20,
        paddingHorizontal: 20,
        paddingVertical: 8
    },
    loginContainer: {
        alignItems: "flex-end"
    },
    loginText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 12
    },
    headerImage: {
        width: 120,
        height: 120,
        marginTop: 40
    },
    headerText: {
        color: 'white',
        fontSize: 42,
        marginBottom: 16
    },
    signUpContainer: {
        width: '70%',
        alignItems: "center"
    },
    signUpButtonContainerView: {
        width: '100%'
    },
    signUpButtonText: {
        color: "#fff",
        fontWeight: "bold"
    },
    subHeaderText: {
        color: 'white',
        fontSize: 20
    },
});




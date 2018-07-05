import React, { Component } from 'react';

import{ LinearGradient } from 'react-native-linear-gradient';

import landingStyles from './landingStyles';
import buttonStyles from '../../styles/generic/buttonStyles';

import { Button } from 'react-native-elements';

import { View, Text, Image } from 'react-native';

export default class Landing extends Component {
    render() {
        return (
            <View style={ landingStyles.container }>
                <View style={{ alignItems: "flex-end"}}>
                    <Button
                        outline
                        rounded
                        buttonStyle={{
                            marginTop:         20,
                            paddingHorizontal: 20,
                            paddingVertical:   8
                        }}
                        textStyle={{
                            color:      "#fff",
                            fontWeight: "bold",
                            fontSize:   12
                        }}
                        title="LOGIN"
                        onPress={ () => this.props.navigation.navigate("SignIn") }
                    />
                </View>

                <View style={{ alignItems: "center", justifyContent: "space-evenly", height: "90%", width: "100%" }}>
                    <View style={{ alignItems: "center" }}>
                        <Text style={{ color: 'white', fontSize: 42, marginBottom: 16 }}>Happening</Text>

                        <Text style={{ color: 'white', fontSize: 20 }}>Find more of what you love</Text>

                        <Image
                            style={{ width: 120, height: 120, marginTop: 40 }}
                            resizeMode="contain"
                            source={require('../../../assets/images/hot-air-balloon.png')}
                        />
                    </View>

                    <View style={{ width: '70%', alignItems: "center" }}>
                        <Button
                            outline
                            containerViewStyle={{ width: '100%' }}
                            textStyle={{ color: "#fff", fontWeight: "bold" }}
                            title="Create an Account"
                            onPress={ () => this.props.navigation.navigate("SignUp") }
                        />
                    </View>
                </View>
            </View>
        );
    }
}


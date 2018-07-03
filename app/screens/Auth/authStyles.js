import { StyleSheet } from 'react-native';

const authStyles = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingVertical: 20,
        backgroundColor: "white"
    },
    container : {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2896d3',
        paddingLeft: 40,
        paddingRight: 40
    },
    textInput: {
        alignSelf: 'stretch',
        padding: 16,
        marginBottom: 20,
        backgroundColor: '#fff',
        borderColor: "#707070"
    },
    btnLink: {
        backgroundColor: "transparent",
        alignItems: 'center',
        alignSelf: 'stretch',
        padding: 16
    },
    btnOutline: {
        backgroundColor: "transparent",
        alignItems: 'center',
        alignSelf: 'stretch',
        padding: 16,
        borderWidth: 1,
        borderColor: '#3939F9'
    }
});

export default authStyles;
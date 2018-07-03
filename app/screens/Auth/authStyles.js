import { StyleSheet } from 'react-native';

const authStyles = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingVertical: 20,
        backgroundColor: "#3939F9"
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
        backgroundColor: '#fff'
    },
    btn: {
        link: {
            backgroundColor: 'transparent'
            color: '#fff',
            alignItems: 'center',
            alignSelf: 'stretch',
            padding: 20
        },
        outline: {
            backgroundColor: 'transparent',
            color: '#fff',
            alignItems: 'center',
            alignSelf: 'stretch',
            padding: 20
        }
    }
});

export default authStyles;
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native'
import React, { FC } from 'react'

// We declare Props which --> this component is way better now as a reusable
// Minimize the hard coded elements / parts
interface Props {
    placeholderText: string;
    value: string;
    onChangeText: (text: string) => void;
}

// An arrow function where we use these previously declared props
const FormInput: React.FC<Props> = ({ placeholderText, value, onChangeText }) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                placeholder={placeholderText}
                value={value}
                onChangeText={(text) => onChangeText(text)} // this will make sure we have the correct text displayed
            />
        </View>
    );
}

export default FormInput

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 10,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInput: {
        width: '90%',
        height: 50,
        paddingHorizontal: 15,
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1,
        paddingVertical: 10,
        marginHorizontal: 15,
        fontSize: 17,
        backgroundColor: 'white',
        textAlign: 'left',
    },
});
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { FC } from 'react'

// Use types for better reusability in other parts
interface Props {
    buttonTitle: string;
    onPress?(): void;
};

// Button function with the previously delcared types
const OwnButton: React.FC<Props> = ({ buttonTitle, onPress}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={onPress}
            >
                <Text style={styles.btnText}>
                    {buttonTitle}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

export default OwnButton

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        top: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: 20,
        width: 200,
        backgroundColor: 'blue',
    },
    btnText: {
        fontWeight: '700',
        fontSize: 17,
        color: 'white',
    }
});
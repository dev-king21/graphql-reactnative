import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function FollowingScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Following Screen
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
    },
});

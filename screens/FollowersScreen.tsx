import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function FollowersScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Followers Screen
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

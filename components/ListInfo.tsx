import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native';
import { ProfileObj } from './types';

interface Props {
    data: ProfileObj
    navigation?: any,
}

const ListInfo = (props: Props) => {
    const { data } = props;
    console.log(data)
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Image
                    style={styles.avatar}
                    source={{ uri: data.avatarUrl }}
                />
                <Text style={styles.name}>{data.name}</Text>
            </View>
            <View style={styles.item}>
                <Text style={styles.label}>login:</Text>
                <Text style={styles.value}>{data.login}</Text>
            </View>
            <View style={styles.item}>
                <Text style={styles.label}>email:</Text>
                <Text style={styles.value}>{data.email}</Text>
            </View>
            <View style={styles.item}>
                <Text style={styles.label}>bio:</Text>
                <Text style={styles.value}>{data.bio}</Text>
            </View>
            <Text style={styles.item} onPress={() => props.navigation.navigate('Repository')}>
                <Text style={styles.label}>Public Repos count:</Text>
                <Text style={styles.value}>{data.repositories.totalCount}</Text>
            </Text>
            <View style={styles.item}>
                <Text style={styles.label}>url:</Text>
                <Text style={styles.value}>{data.url}</Text>
            </View>
            <Text style={styles.item} onPress={() => props.navigation.navigate('Following')}>
                <Text style={styles.label}>following:</Text>
                <Text style={styles.value}>{data.following.totalCount}</Text>
            </Text>
            <Text style={styles.item} onPress={() => props.navigation.navigate('Followers')}>
                <Text style={styles.label}>followers:</Text>
                <Text style={styles.value}>{data.followers.totalCount}</Text>
            </Text>
            <View style={styles.item}>
                <Text style={styles.label}>created:</Text>
                <Text style={styles.value}>{new Date(data.createdAt).toDateString()}</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 30
    },
    header: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'rgba(40, 103, 255, 0.1)',
        paddingBottom: 40,
        paddingTop: 40
    },
    avatar: {
        width: 72,
        height: 72
    },
    item: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        borderColor: '#ccc',
        borderBottomWidth: 1,
        paddingTop: '10px',
        paddingBottom: '10px'
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    value: {
        fontSize: 16
    },
    name: {
        marginTop: 10,
        fontSize: 18,
        letterSpacing: 1
    }
})

export default ListInfo;
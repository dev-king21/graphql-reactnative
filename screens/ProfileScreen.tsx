import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, View, ActivityIndicator } from 'react-native';

import ListInfo from '../components/ListInfo';
import { getUserInfo } from '../others/getInfo';
import { ProfileObj } from '../components/types';
import AsyncStorage from '@react-native-community/async-storage';

interface Props {
    navigation: any,
}

export default function ProfileScreen(props: Props) {
    const [isLoading, setLoading] = useState<boolean>(true)
    const [data, setData] = useState<ProfileObj>({
        avatarUrl: '',
        name: '',
        login: '',
        email: '',
        bio: '',
        repositories: { totalCount: 0 },
        url: '',
        following: { totalCount: 0 },
        followers: { totalCount: 0 },
        createdAt: '',
    })

    const userCache = async () => {
        const value: any = await AsyncStorage.getItem('OAuthToken')
        const data: any = await getUserInfo(value)

        try {
            if (data) {
                setData(data)
                setLoading(false)
            }
            // throw new Error("Error");
        } catch (e) {
            // error
        }
    }

    useEffect(() => {
        userCache();
    }, []);


    const view = () => {
        return (
            <>
                <ListInfo data={data} {...props} />
                <View style={styles.logout}><Button onPress={() => { AsyncStorage.removeItem('OAuthToken').then(() => { props.navigation.push('Login') }) }} title="LOGOUT" /></View>
            </>
        );
    }

    return (
        <View style={styles.container}>
            {isLoading ? <View style={styles.loading}><ActivityIndicator size="large" /></View> : view()}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    logout: {
        width: '80%',
        borderRadius: 5
    },
    loading: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    }
});

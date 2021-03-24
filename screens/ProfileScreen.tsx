import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, View } from 'react-native';

import ListInfo from '../components/ListInfo';
import { getUserInfo } from '../others/getInfo';
import { ProfileObj } from '../components/types';
import AsyncStorage from '@react-native-community/async-storage';

interface Props {
    navigation: any,
}

export default function ProfileScreen(props: Props) {
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
            }
            // throw new Error("Error");
        } catch (e) {
            // error
        }
    }

    useEffect(() => {
        userCache();
    }, []);

    return (
        <View style={styles.container}>
            <ListInfo data={data} {...props} />
            <View style={styles.logout}><Button onPress={() => { AsyncStorage.removeItem('OAuthToken').then(() => { props.navigation.push('Login') }) }} title="LOGOUT" /></View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    logout: {
        width: '80%',
        borderRadius: 5
    }
});

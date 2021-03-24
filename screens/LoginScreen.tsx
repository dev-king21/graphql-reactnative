import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, SafeAreaView, View, Button, ActivityIndicator } from 'react-native';
import { getUserInfo } from '../others/getInfo';

import AsyncStorage from '@react-native-community/async-storage';

interface Props {
    navigation: any
}

export default function LoginScreen(props: Props) {
    const [token, setToken] = useState('');
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        getData()
    }, []);

    const getData = async () => {
        const value = await AsyncStorage.getItem('OAuthToken')
        try {
            if (value !== null) {
                props.navigation.replace('Root')
            }
            throw new Error("Error");
        } catch (e) {
            setLoading(false)
        }
    }

    const storeData = async (value: any) => {
        try {
            const data: any = await getUserInfo(value)
            if (data.login) {
                await AsyncStorage.multiSet([['OAuthToken', value], ['username', data.login]])
                props.navigation.replace('Root')
            }
        } catch (e) {
            // saving error
        }
    }

    const loginView = () => {
        return (
            <View style={styles.view}>
                <TextInput
                    placeholder='Github API Token'
                    multiline numberOfLines={5}
                    onChangeText={token => setToken(token)}
                    value={token}
                    maxLength={40}
                    style={styles.textinput}
                />

                <Button title="LOGIN" onPress={async () => storeData(token)} />
            </View>
        )
    }

    return (
        <SafeAreaView>
            {isLoading ? <ActivityIndicator size="large" /> : loginView()}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    view: {
        height: '100%',
        padding: 40,
        display: 'flex',
    },
    textinput: {
        width: '100%',
        marginTop: 200,
        marginBottom: 40,
        border: '1px solid #4c4c4c',
        borderRadius: 5,
        padding: 10
    },
    button: {
        marginTop: 40
    }
})



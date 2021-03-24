import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text, ActivityIndicator } from 'react-native';
import { getRepo } from '../others/getInfo';
import { RepositoryObj } from '../components/types';
import AsyncStorage from '@react-native-community/async-storage';

export default function RepositoryScreen() {
    const [isLoading, setLoading] = useState<boolean>(true)
    const [lists, setLists] = useState<RepositoryObj[]>([]);

    useEffect(() => {
        getRepoInfo()
    }, []);

    const getRepoInfo = async () => {
        try {
            const token: any = await AsyncStorage.getItem('OAuthToken')
            const data: any = await getRepo(token)
            if (data) {
                let repositoryList: RepositoryObj[] = []
                data.repositories.nodes.forEach((item: RepositoryObj) => {
                    repositoryList.push(item)
                })
                setLists(repositoryList)
                setLoading(false)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const view = () => {
        return (
            <ScrollView>
                {
                    lists.map((item: any, index) =>
                        <View key={index} style={styles.container}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.title}>{item.name}</Text>
                                <Text>{item.description}</Text>
                            </View>
                            <Text>
                                {item.owner.login}
                            </Text>
                        </View>
                    )
                }
            </ScrollView>
        )
    }
    return (<>
        {isLoading ? <View style={styles.loading}><ActivityIndicator size="large" /></View> : view()}
    </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: '8px',
        minHeight: '60px'
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    loading: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    }
});

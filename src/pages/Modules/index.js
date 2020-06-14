import React, { useEffect, useState, useContext } from 'react';

import { View, Text, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { Header, H1, H2 } from 'native-base';

import { Icon } from 'react-native-elements';

import { DrawerActions } from '@react-navigation/native';

import styles from './styles';

import api from "../../server/api";

import Context from "../../contexts/modulo-chose";
// import { modulo } from 'react-native-reanimated';

export default function Modules({ navigation }) {

    const [ info , setInfo ] = useState([]);

    const { modulo_choose, SetModuloChoose } = useContext(Context);

    useEffect( () => {
        async function fetchData() {
            const req = await api.get("/modulos");

            setInfo(req.data.modulos)
            
        }

        fetchData();
    }, [])

    function HandleChooseModule(modulo_id) {

        SetModuloChoose({ modulo_id })// -> this function comes from the Context Api
        navigation.navigate('Exercise')
    }
    

    console.log(modulo_choose)

    return(
        <View style={styles.container}>
            <Header  
                androidStatusBarColor='#3498db' 
                style={styles.header}
            >
                <H1 style={styles.h1}>Modules</H1>
                <Icon 
                    name="align-justify"
                    color='#fff'
                    iconStyle={{ marginRight: 5 }}
                    type="font-awesome"
                    onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}
                />
            </Header>
            <View style={styles.content}>
                <SafeAreaView>
                    <FlatList
                        data={info}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => {
                            return(
                                <View style={styles.box}>
                                    <TouchableOpacity 
                                        style={styles.module}
                                        onPress={() => HandleChooseModule(item.id)}
                                        // onPress={() => //navigation.navigate('Exercise')}
                                    >
                                        <H2 style={styles.title}>{item.title}</H2>
                                        <Text style={styles.description}>{item.describe}</Text>
                                    </TouchableOpacity>
                                </View>
                            );
                        }}
                    />
                </SafeAreaView>
            </View>
        </View>
    );
}
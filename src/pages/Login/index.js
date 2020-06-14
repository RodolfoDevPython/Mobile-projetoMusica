import React, { useState } from 'react';

import { 
    View,
    Text, 
    TextInput,
    StatusBar,
    TouchableOpacity 
} from 'react-native';

import { Icon } from 'react-native-elements';

import styles from './styles';

import api from "../../server/api";

export default function Login({ navigation }) {

    const [ info, setInfo ] = useState({ nome: "", senha: "", msg: "" });

    async function acessLogin() {

        return navigation.navigate('Home') 
        
        const request = await api.post("aluno/login", { nome: info.nome , senha: info.senha });

        setInfo({ ...info, msg: request.data.message });

        if ( request.status == 201 ) return navigation.navigate('Home') 
        
    }

    return(
        <View style={styles.container}>
            <StatusBar 
                barStyle="dark-content" 
                backgroundColor='#fff'
            />
            <Text>{info.msg}</Text>
            <View style={styles.inputStyle}>
                <Icon
                    name="user"
                    type="font-awesome"
                />
                <TextInput
                    style={styles.name}
                    placeholder="Digite seu nome"
                    underlineColorAndroid="transparent"
                    onChangeText={ (text) => setInfo({ ...info, nome: text })}
                />
            </View>
            <View style={styles.inputStyle}>
                <Icon
                    name="key"
                    type="font-awesome"
                />
                <TextInput
                    style={styles.password}
                    placeholder="Digite sua senha"
                    underlineColorAndroid="transparent"
                    onChangeText={ (text) => setInfo({ ...info, senha: text })}
                />
            </View>
            <TouchableOpacity 
                style={styles.open}
                onPress={acessLogin}
            >
                <Text style={styles.textOpen}>Entrar</Text>
            </TouchableOpacity>
        </View>
    );
}
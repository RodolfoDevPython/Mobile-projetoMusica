import React, { useContext, useEffect, useState } from 'react';

import { View, Text, StatusBar, TouchableOpacity, FlatList } from 'react-native';

import { H1 } from 'native-base';

import { Icon } from 'react-native-elements';

import Context from "../../contexts/modulo-chose";

import Api from "../../server/api";

import styles from './styles';

export default function Exercise() {

    const { modulo_choose } = useContext(Context);

    const [ data, setData ] = useState([]);

    const [ option, setOptions ] = useState([]);

    const [ navBar, setNavBar ] = useState([]);

    const [ exeChoose , setExeChoose ] = useState({ id: 0, exe: "" });

    
    useEffect( () => {
        async function fetchData() {
            const id = modulo_choose.modulo_id
            
            const url = `/modulo/${id}/exercicios`  
            
            const resp = await Api.get(url);
            const dados = resp.data.docs;

            await setData(dados);

            // arr.indexOf(el.id) == i )
            await setNavBar(dados.filter( function (a) {
                return !this[JSON.stringify(a.id)] && (this[JSON.stringify(a.id)] = true);
            }, Object.create(null)  ));

            // await setNavBar(itemNav);
        }
        fetchData();
    
    }, [ ]);

    useEffect( () => {
        console.log("foi modificado o data 1")
        console.log(data)
    }, [ data ])

    function HandleOptions(item) {

    }

    function HandleChooseExercicios(item) {
        console.log(item)
        
        const exe = data.filter( (value) => {
            return value.id == exeChoose
        })
        console.log("depois do click")
        console.log(exe)
        setExeChoose({ id: item, exe });
    }

    let cont  = 0;

    return(
        <View style={styles.container}>
            <StatusBar 
                barStyle="dark-content" 
                backgroundColor='#fff'
            />
            <H1 style={styles.title}>Exercises</H1>
            <Text style={styles.question}>
            { 
                exeChoose.exe != "" ? exeChoose.exe : "Lorem ipsum dolor sits amet consectetur adipisicing elit."
            }
            </Text>
            <View style={styles.group}>

                { 
                    // data.map( (el) => {

                    //     // let alternativa = el.RespostaCerta ? el.RespostaCerta.descricao : "nao tem valor";
                    //     if (el.RespostaCerta) {
                    //         console.log(el.RespostaCerta.descricao)
                    //         let alternativa = el.RespostaCerta.descricao;

                    //         return (
                    //             <TouchableOpacity style={styles.answer}>
                    //                 <Text style={styles.alternative}>{alternativa}</Text>
                    //             </TouchableOpacity>
                    //         );
                    //     }

                    //     // return (
                    //     //     <TouchableOpacity style={styles.answer}>
                    //     //         <Text style={styles.alternative}>{alternativa}</Text>
                    //     //     </TouchableOpacity>
                    //     // );
                    // }) 
                    
                }

                <FlatList 
                    data={data}
                    horizontal={false}
                    showsHorizontalScrollIndicator={true}
                    numColumns={2}
                    renderItem={ ({ item }) => {
                            cont++;

                            if (item.RespostaCerta) {
                            
                                    let alternativa = item.RespostaCerta.descricao;
                                    console.log("aqui---------------------")
                                    console.log(item.RespostaCerta)
                                    console.log(alternativa)

                                    return (    
                                        <TouchableOpacity style={styles.answer}>
                                            <Text style={styles.alternative}>{alternativa}</Text>
                                        </TouchableOpacity>
                                    )
                            }
                            
                            
                            // console.log(el.index)
                            // console.log(el.item.RespostaCerta)
                            
                        }
                    }/> 
            
            </View> 
            <View style={styles.content}>
                <FlatList 
                    data={navBar}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ navBar }) => {
                        return(
                            <View style={styles.box}>
                                <Icon 
                                    name="question-circle"
                                    type="font-awesome"
                                />
                                <TouchableOpacity
                                    onPress={() => HandleChooseExercicios(navBar)} >
                                    <Text>Exercicio - {navBar}</Text>
                                </TouchableOpacity>
                            </View>
                        );
                    }}
                />
            </View>
        </View>
    );
}
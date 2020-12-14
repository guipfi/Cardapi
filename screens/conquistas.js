import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
import {globalStyles} from '../styles/global';
import { MaterialIcons } from '@expo/vector-icons'; 
import {firebase} from '../utils/firebase';
import Loading from '../shared/Loading';

export default function Conquistas({navigation}){
    
    const renderConquista = (item) =>{
        return(
            <View style={{...styles.cardContainer, marginBottom: 20}}>
                <View style={styles.pointContent}>
                    <View style>
                        <Text style={{...globalStyles.h5, flex: 5, color: 'white', marginTop: 20}}>{item.item.points}</Text>
                    </View>
                </View>
                <View style={styles.cardContent}>
                    <View>
                        <Text style={globalStyles.sub1}>{item.item.nome}</Text>
                    </View>
                    
                    <View style={globalStyles.legenda1, styles.descricao}>
                        <Text>{item.item.descricao}</Text>
                    </View>
                </View>
            </View>
        );
    }
    
    const [conquistas, setConquistas] = useState([
        {nome: 'Louco por Pastel', descricao: 'Peça dois pastéis.', points: 300},
        {nome: 'Louco por Churros', descricao: 'Peça cinco churros.', points: 500},
        {nome: 'Louco por Coxinha', descricao: 'Peça uma coxinha.', points: 100},
        {nome: 'Louco por Bolo', descricao: 'Peça dois bolos de cenoura.', points: 50}
    ]);

    return(
       <View style={styles.content}>
           <View style={styles.container}>
                <FlatList
                data={conquistas}
                renderItem={renderConquista}
                ListFooterComponent= {()=> (
                    <View style={{marginBottom:"30.5%"}}></View>
                )}
                keyExtractor={(item) => item.nome}
                ListHeaderComponent={() => (
                    <View styles={{flex: 1, marginTop: 10}}>
                        <Text style={{...globalStyles.h6, margin: 15}}>Cantina Tradicional de Santos</Text>                        
                    </View>
                )}
                />
           </View>
       </View> 
    )
};

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    content: {
        flex:1,
        backgroundColor: 'white',
        borderRadius: 16,
    },
    cardContainer: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: "#ededed",
        height: "auto",
        marginTop: 10,
        minHeight: 80,
        marginRight: 10,
        marginLeft: 10,
        borderRadius: 8,
    },
    
    cardContent: {
        flex: 4,
        padding: 10,
        flexDirection: 'column', 
        maxWidth: "50%",
    },

    pointContent: {
        maxWidth: 100,
        minWidth: 100,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        backgroundColor: '#F1C552',
        justifyContent: 'center',
        alignItems: 'center',
    }
});
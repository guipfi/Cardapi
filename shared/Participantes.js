import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

// Estilo Global
import {globalStyles} from '../styles/global';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Participantes({participantes, setParticipantes}){

  const renderHeader = () => {
    return(
      <View>
        <Text style={{...globalStyles.h5, ...globalStyles.preto2, marginBottom: 10}}>Participantes</Text>
      </View>
    );
  }

  const atualizarVisibilidade = (item) => {
    let cpf = item.cpf;
    let newParticipantes = [...participantes];
    const index = newParticipantes.findIndex(e => e.cpf == cpf ? true : false);
    newParticipantes[index].visivel == "true" ? (
      newParticipantes[index].visivel = "false"
    ) : (
      newParticipantes[index].visivel = "true"
    );
    setParticipantes(newParticipantes);
  }

  return (
      <View style={{marginLeft: '3%'}}>
        <FlatList 
          scrollEnabled={false}
          data={participantes}
          numColumns={4}
          ListHeaderComponent={renderHeader}
          renderItem={({item}) => (
            <View style={{marginBottom: '2%', marginTop:'4%', marginRight: 10}}>
              <View>
                {/* Foto */}
                <View style={{width: 60, height: 60, borderRadius: 360, backgroundColor: globalStyles.branco5.color, justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{...globalStyles.body1, ...globalStyles.preto1}}>{item.foto}</Text>
                </View>
                {/* Icone */}
                <TouchableOpacity
                    onPress={() => {
                      atualizarVisibilidade(item);
                    }}
                  >
                <View style={{marginTop: 8, alignSelf: 'center'}}>
                  {item.visivel == "true" ? (
                    <MaterialIcons name="visibility" size={25} color={globalStyles.preto3.color}/>
                  ) : (
                    <MaterialIcons name="visibility-off" size={25} color={globalStyles.preto3.color}/>
                  )}
                  
                </View>
                </TouchableOpacity>
              </View>
            </View>       
          )}
          listKey={'participantes'}
          keyExtractor={item => item.cpf}
        />
      </View>
  );
};
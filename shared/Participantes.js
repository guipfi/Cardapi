import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  SafeAreaView
} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import {useSelector, useDispatch} from 'react-redux';
import {setVisibilidade} from '../actions/consumoActions';

// Estilo Global
import {globalStyles} from '../styles/global';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Participantes(){

  const consumo = useSelector(state => state.consumo);

  const dispatch = useDispatch();

  const renderHeader = () => {
    return(
      <View>
        <Text style={{...globalStyles.h5, ...globalStyles.preto2, marginBottom: 10}}>Participantes</Text>
      </View>
    );
  }

  const atualizarVisibilidade = (item) => {
    dispatch(setVisibilidade(item.id));
  }

  return (
    <SafeAreaView>
      <View style={{marginLeft: '3%'}}>
        <FlatList 
          listKey="participantes"
          scrollEnabled={false}
          data={consumo.participantes}
          numColumns={4}
          ListHeaderComponent={renderHeader}
          renderItem={({item}) => (
            <View style={{marginBottom: '2%', marginTop:'4%', marginRight: 10}}>
              <View>
                {/* Foto */}
                <View>
                  <Image source={{ uri: item.foto }} style={{width: 60, height: 60, borderRadius: 360, borderWidth: 1, borderColor: "black"}}/>
                </View>
                {/* Icone */}
                <TouchableOpacity
                    onPress={() => {
                      atualizarVisibilidade(item);
                    }}
                  >
                <View style={{marginTop: 8, alignSelf: 'center'}}>
                  {item.visivel ? (
                    <MaterialIcons name="visibility" size={25} color={globalStyles.preto3.color}/>
                  ) : (
                    <MaterialIcons name="visibility-off" size={25} color={globalStyles.preto3.color}/>
                  )}
                  
                </View>
                </TouchableOpacity>
              </View>
            </View>       
          )}
          keyExtractor={item => item.id}
        />
      </View>
      </SafeAreaView>
  );
};
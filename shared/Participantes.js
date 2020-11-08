import React, { useState } from 'react';
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

export default function Consumo(){
  const [participantes, setParticipantes] = useState([
    {
    "visivel": "true",
    "cpf": "88765437890",
    "nome": "João Almeida",
    "foto": "JA",
    "pedido": [{
    "id": "0",
    "produto": "Coca-Cola",
    "quantidade": "1",
    "valor_uni": "6.00",
    "observacao": ""
  },{
    "id": "1",
    "produto": "Pastel de frango milho e catupiry",
    "quantidade": "2",
    "valor_uni": "7.25",
    "observacao": "Por favor, retirar o milho e enviar vinagrete"
  }]},
  {
    "visivel": "true",
    "cpf": "44565437985",
    "nome": "Gabriela Rodrigues",
    "foto": "GR",
    "pedido": [{
    "id": "0",
    "produto": "Coca-Cola",
    "quantidade": "1",
    "valor_uni": "6.00",
    "observacao": ""
  },{
    "id": "1",
    "produto": "Pastel de frango milho e catupiry",
    "quantidade": "2",
    "valor_uni": "7.25",
    "observacao": "Por favor, retirar o milho e enviar vinagrete"
  }]
  },
  {
    "visivel": "true",
    "cpf": "13265437654",
    "nome": "Giulia Fogaça",
    "foto": "GF",
    "pedido": []
  },
  {
    "visivel": "true",
    "cpf": "13265437655",
    "nome": "Giulia Fogaça",
    "foto": "GF",
    "pedido": []
  },
  {
    "visivel": "false",
    "cpf": "13265437653",
    "nome": "Giulia Fogaça",
    "foto": "GF",
    "pedido": []
  },
  ]);

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
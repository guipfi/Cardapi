import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TextInput,
  ScrollView,
  FlatList,
} from "react-native";
import Modal from "react-native-modalbox";
import { MaterialIcons } from '@expo/vector-icons';

// Estilo Global
import {globalStyles} from '../styles/global';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Carrinho(){
  const [carrinho, setCarrinho] = useState([{
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
  }]);

  const renderHeader = () => {
    return(
      <View>
        <Text style={{...globalStyles.sub1, ...globalStyles.preto2, marginLeft: '3%', marginBottom: 10}}>Resumo do pedido</Text>
        <View style={{borderWidth: 1, borderColor: globalStyles.branco5.color}} />
      </View>
    );
  }

  const renderFooter = () => {
    let subtotal = 0;
    carrinho.forEach((item) => {
      subtotal += item.quantidade * item.valor_uni;
    });
    subtotal = subtotal.toFixed(2);
    return (
      <View>
        <View style={{borderWidth: 1, borderColor: globalStyles.branco5.color}} />
        <View>
          <Text style={{...globalStyles.sub2, marginTop: '5%',textAlign: 'right'}}>SUBTOTAL: <Text style={globalStyles.sub1}>R$ {subtotal}</Text></Text>
        </View>
        <View style={{height: 47, width: '44%', alignSelf: 'center', marginTop: '12%'}}>
          <View style={styles.buttonShadow}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
                style={{width: '100%', height: '100%'}}
              >
                <View style={{...styles.buttonStyle}}>
                  <Text style={{color: globalStyles.branco1.color}}>Confirmar pedido</Text>
                </View>  
              </TouchableOpacity>  
            </View>        
          </View>
      </View>
    );
  }

  const renderSeparator = () => {
    return (
      <View style={{borderWidth: 1, borderColor: globalStyles.branco5.color}} />
    );
  }

  const renderEmpty = () => {
    return (
      <View>
        <Text style={{...globalStyles.sub2, textAlign: 'center', marginTop: '3%'}}>Seu carrinho está vazio.</Text>
      </View>
    );
  }

  const atualizarQuantidade  = (item, op) => {
    let id = item.id;
    let newQuantidade;
    if(op=='adicionar') {
      newQuantidade=parseInt(item.quantidade)+1;
    } else {
      newQuantidade=parseInt(item.quantidade)-1;
    }
    let newCarrinho = [...carrinho];
    const index = newCarrinho.findIndex(e => e.id == id ? true : false);
    newQuantidade = (newQuantidade < 1) ? (
      newCarrinho.splice(index,1)
    ) : (
      newQuantidade = newQuantidade.toString(),
      newCarrinho[index].quantidade=newQuantidade
    );
    setCarrinho(newCarrinho);
  }

  return (
      <View>
        <FlatList 
          ItemSeparatorComponent={renderSeparator}
          scrollEnabled={false}
          data={carrinho}
          ListHeaderComponent={() => {return (carrinho.length > 0 ? renderHeader() : null)}}
          renderItem={({item}) => (
            <View style={{marginBottom: '4%', marginTop:'4%'}}>
              <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent:'space-between'}}>
                <View style={{flex: 1.6, marginLeft: '3%'}}>
                  <Text style={globalStyles.sub1}>{item.produto}</Text>
                </View>
                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', flex: 1.5}}>
                  <TouchableOpacity
                    onPress={() => {
                      atualizarQuantidade(item, 'remover');
                    }}
                  >
                    <View style={{borderWidth: 2, borderColor: globalStyles.preto3.color, width: 30, height: 30, borderRadius: 360, justifyContent: 'center'}}>
                        <Text style={{color: globalStyles.preto2.color, ...globalStyles.sub1, alignSelf: 'center'}}>-</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={{width: 40, height: 40, backgroundColor: globalStyles.preto3.color, borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginRight: 5,marginLeft: 5}}>
                    <Text style={{color: globalStyles.branco1.color, ...globalStyles.sub1}}>{item.quantidade}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      atualizarQuantidade(item, 'adicionar');
                    }}
                  >
                    <View style={{borderWidth: 2, borderColor: globalStyles.preto3.color, width: 30, height: 30, borderRadius: 360, justifyContent: 'center', alignItems: 'center'}}>
                      <Text style={{color: globalStyles.preto2.color, ...globalStyles.sub1}}>+</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{flex:1, display: 'flex', alignItems: 'flex-end'}}>
                  <Text style={globalStyles.body1}>R$ {(item.quantidade*item.valor_uni).toFixed(2)}</Text>
                </View>
              </View>
              {item.observacao.length > 0 &&
                <Text style={{...globalStyles.body3, marginLeft: '6%', marginTop: '4%'}}>| {item.observacao}</Text>
              }
            </View>       
          )}
          listKey={'carrinho'}
          keyExtractor={item => item.id}
          ListFooterComponent={() => {return (carrinho.length > 0 ? renderFooter() : null)}}
          ListEmptyComponent={renderEmpty}
        />
      </View>
  );
};

  const styles = StyleSheet.create({
  
    buttonShadow: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      borderRadius: 5,
      backgroundColor: 'transparent',
    },
    buttonStyle: {
      backgroundColor: globalStyles.vermelho3.color,
      borderRadius: 5,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
  
  });
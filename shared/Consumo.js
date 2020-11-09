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

const Consumo = ({consumo}) => {
  
  const renderHeader = () => {
    return(
      <View>
        <Text style={{...globalStyles.h5, ...globalStyles.preto2, marginBottom: 10, marginLeft: '3%'}}>Pedidos realizados</Text>
        <View style={{borderWidth: 1, borderColor: globalStyles.branco5.color, marginBottom: 10}} />
      </View>
    );
  }

  const renderSeparator = () => {
    return (
      <View style={{borderWidth: 1, borderColor: globalStyles.branco5.color}} />
    );
  }

  const renderFooterPedido = (item) => {
    let subtotal = 0;
    item.forEach((produto) => {
      subtotal += produto.quantidade * produto.valor_uni;
    });
    subtotal = subtotal.toFixed(2);
    return (
      <View style={{display: 'flex', marginTop: 10}}>
        <View style={{alignSelf: 'flex-end'}}>
          <View style={{borderWidth: 1}}></View>
          <Text style={{...globalStyles.body2, marginTop: 10}}>SUBTOTAL: <Text style={globalStyles.body1}>R$ {subtotal}</Text></Text>
        </View>
      </View>
    )
  }

  const renderFooterConsumo = () => {
    let total = 0;
    consumo.forEach((pessoa) => {
      pessoa.pedido.forEach((produto) => {
        total += produto.quantidade * produto.valor_uni;
      });
    });
    total = total.toFixed(2);
    return (
      <View>
        <View style={{marginBottom: 25, marginTop: 20}}>
          <Text style={{...globalStyles.sub2, textAlign: 'right'}}>TOTAL DA COMANDA: <Text style={globalStyles.sub1}>R$ {total}</Text></Text>
        </View>
        <View style={{borderWidth: 1, borderColor: globalStyles.branco5.color}} />
      </View>
    )
  }

  const renderEmpty = () => {
    return (
      <View>
        <Text style={{...globalStyles.sub2, textAlign: 'center', marginTop: '3%'}}>Ainda não fez pedidos.</Text>
      </View>
    );
  }
  
  return (
      <View>
        <FlatList 
          scrollEnabled={false}
          data={consumo}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={renderFooterConsumo}
          renderItem={({item}) => (
            item.visivel=="true" ? (
            <View style={{marginBottom: '3%', marginTop:'3%', marginLeft: '3%'}}>
              <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                {/* Foto */}
                <View style={{width: 60, height: 60, borderRadius: 360, backgroundColor: globalStyles.branco5.color, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{...globalStyles.body1, ...globalStyles.preto1}}>{item.foto}</Text>
                  </View>
                {/* Nome */}
                <Text style={{...globalStyles.preto1, ...globalStyles.sub1, marginLeft: 10}}>{item.nome}</Text>
              </View>
              <View>
                <FlatList 
                  listKey={item.id}
                  keyExtractor={item => item.id}
                  scrollEnabled={false}
                  data={item.pedido}
                  ListFooterComponent={() => {return (item.pedido.length > 0 ? renderFooterPedido(item.pedido) : null)}}
                  ListEmptyComponent={renderEmpty}
                  renderItem={({item}) => (
                    <View style={{marginBottom: '4%', marginTop:'4%'}}>
                      <View style={{display: 'flex', flexDirection: 'row', justifyContent:'space-between'}}>
                        <View>
                          <Text style={globalStyles.sub2}>{item.quantidade} x</Text>
                        </View>
                        <View style={{flex: 1.6, marginLeft: '3%'}}>
                          <Text style={globalStyles.sub2}>{item.produto}</Text>
                          <View>
                            {item.observacao.length > 0 &&
                              <Text style={{...globalStyles.body4, marginLeft: '6%', marginTop: '4%'}}>| {item.observacao}</Text>
                            }
                          </View>
                        </View>
                        <View style={{flex:1, display: 'flex', alignItems: 'flex-end'}}>
                          <Text style={globalStyles.body1}>R$ {(item.quantidade*item.valor_uni).toFixed(2)}</Text>
                        </View>
                      </View>
                      
                    </View> 
                    )}/>
                   <View style={{borderWidth: 1, borderColor: globalStyles.branco5.color, marginTop: 20}} />
                  </View>
                  </View>
                    ) : (null)
          )}
          listKey={'consumo'}
          keyExtractor={item => item.id}
        />
      </View>
  );
};

export default Consumo;
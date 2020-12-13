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
import {useSelector} from 'react-redux';

// Estilo Global
import {globalStyles} from '../styles/global';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Consumo = ({consumo}) => {
  
  const renderHeader = () => {
    return(
      <View>
        <Text style={{...globalStyles.h5, ...globalStyles.preto2, marginBottom: 10, marginLeft: '3%'}}>Resumo dos pedidos</Text>
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
      item.forEach((pedido) => {
        pedido.pedidos.forEach((produto) => {
          subtotal += produto.quantidade * produto.valor;
        });
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
        pessoa.pedidos.forEach((pedido) => {
          pedido.pedidos.forEach((produto) => {
            total += produto.quantidade * produto.valor;
          });
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
      <SafeAreaView>
        <FlatList 
          scrollEnabled={false}
          data={consumo}
          keyExtractor={item => item.id}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={renderFooterConsumo}
          renderItem={({item}) => (
            item.visivel ? (
            <View style={{marginBottom: '3%', marginTop:'3%', marginLeft: '3%'}}>
              <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                {/* Foto */}
                <Image source={{ uri: item.foto }} style={{width: 60, height: 60, borderRadius: 360, borderWidth: 1, borderColor: "black"}}/>
                {/* Nome */}
                <Text style={{...globalStyles.preto1, ...globalStyles.sub1, marginLeft: 10}}>{item.nome}</Text>
              </View>
              <View>
                <FlatList 
                  keyExtractor={(item) => item.id}
                  scrollEnabled={false}
                  data={item.pedidos}
                  ListFooterComponent={() => {return (item.pedidos ? renderFooterPedido(item.pedidos) : null)}}
                  ListEmptyComponent={renderEmpty}
                  renderItem={({item}) => (
                    <FlatList
                      keyExtractor={item => item.product_id.toString()}
                      scrollEnabled={false}
                      data={item.pedidos}
                      renderItem={({item}) => (
                        <View style={{marginBottom: '4%', marginTop:'4%'}}>
                        <View style={{display: 'flex', flexDirection: 'row', justifyContent:'space-between'}}>
                          <View>
                            <Text style={globalStyles.sub2}>{item.quantidade} x</Text>
                          </View>
                          <View style={{flex: 1.6, marginLeft: '3%'}}>
                            <Text style={globalStyles.sub2}>{item.nome}</Text>
                            <View>
                              {item.observacao &&
                                <Text style={{...globalStyles.body4, marginLeft: '6%', marginTop: '4%'}}>| {item.observacao}</Text>
                              }
                            </View>
                          </View>
                          <View style={{flex:1, display: 'flex', alignItems: 'flex-end'}}>
                            <Text style={globalStyles.body1}>R$ {(item.quantidade*item.valor).toFixed(2)}</Text>
                          </View>
                        </View>
                      </View> 
                      )}
                      />
                  )}
                  />
                   <View style={{borderWidth: 1, borderColor: globalStyles.branco5.color, marginTop: 20}} />
                  </View>
                  </View>
                    ) : (null)
          )}
        />
      </SafeAreaView>
  );
};

export default Consumo;
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import {firebase} from '../utils/firebase';
import {setComanda} from '../actions/userActions';

// Estilo Global
import {globalStyles} from '../styles/global';
import { NavigationRouteContext } from '@react-navigation/native';

export default function GerenciarComanda({voltar, navigation}) {

  const [requisicoes, setRequisicoes] = useState([]);

  const comanda = useSelector(state => state.comanda);

  const dispatch = useDispatch();


  useEffect(() => {
    firebase.database().ref('comandas/'+comanda.comanda_id+'/autorizacoes/').on('value', snap => {
      let requests = [];
      let processados = 0;
      if(!snap.val()) {
        setRequisicoes([]);
      }
      snap.forEach((request) => {
        requests.push({id: request.key, ...request.val()});
        processados++;
      });
      if(snap.val() && processados == Object.keys(snap.val()).length) {
        setRequisicoes(requests);
      } 
    });
  }, []);

  const renderHeader = () => {
    return(
      <View>
        <Text style={{...globalStyles.h6, ...globalStyles.preto2, marginLeft: '3%', marginBottom: 10}}>Solicitações</Text>
        <View style={{borderWidth: 1, borderColor: globalStyles.branco5.color}} />
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
        <Text style={{...globalStyles.sub2, textAlign: 'center', marginTop: 30, marginBottom:30}}>Não há solicitações em aberto.</Text>
      </View>
    );
  }
  
  return (
    <>
    { requisicoes ?
    <View style={{...globalStyles.container, justifyContent: 'flex-start', marginTop: 20}}>
    <View style={{width: "90%"}}>
    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
      <TouchableOpacity onPress={() => voltar(false)}>
        <MaterialIcons name="arrow-back" size={30} color={globalStyles.preto1.color}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        voltar(false);
        navigation.goBack();
      }}>
        <MaterialIcons name="close" size={30} color={globalStyles.preto1.color}/>
      </TouchableOpacity>
    </View>
    <Text style={{...globalStyles.h5, marginBottom:30, marginTop: 30}}>Gerenciar Comanda</Text>
    <FlatList
      scrollEnabled={false}
      data={requisicoes}
      listKey={'requisicoes'}
      keyExtractor={item => item.id}
      ListHeaderComponent={renderHeader}
      ListEmptyComponent={renderEmpty}
      ItemSeparatorComponent={renderSeparator}
      ListFooterComponent={renderSeparator}
      renderItem={({item})=> (
        <View style={{marginBottom:5}}>
          <View>
              <View style={{height: 80, width: "90%", alignSelf: 'center', justifyContent: 'center'}}>
                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                  <View style={{flex:1}}>
                  <Image source={{ uri: item.foto }} style={{width: 60, height: 60, borderRadius: 360, borderWidth: 1, borderColor: "black"}}/>
                  </View>
                  <View style={{flex:2}}>
                    <Text style={globalStyles.sub2}>{item.nome}</Text>
                  </View>
                  <View style={{width: 50, height: 50, borderRadius: 360, borderColor: "black",backgroundColor: "green", justifyContent: 'center', alignItems: 'center', marginRight: 5}}>
                      <View style={styles.Shadow}>
                      <TouchableOpacity onPress={() => {
                        console.log(comanda.comanda_id, item.id, true);
                        dispatch(setComanda(comanda.comanda_id, item.id, true, item));
                      }}>
                      <MaterialIcons name="check" size={30} color={globalStyles.branco1.color}/>
                      </TouchableOpacity>  
                      </View>
                  </View>
                  <View style={{width: 50, height: 50, borderRadius: 360, borderColor: "black",backgroundColor: globalStyles.vermelho1.color, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={styles.Shadow}>
                      <TouchableOpacity onPress={() => {
                        dispatch(setComanda(null, item.id, true, item));
                      }}>
                      <MaterialIcons  name="close" size={30} color={globalStyles.branco1.color}/>
                      </TouchableOpacity>  
                      </View>
                  </View>
                </View>
              </View> 
          </View>
        </View>
        )}
        />  
      </View> 
      </View>
      :
        null
      }
      </>
  );
}

const styles = StyleSheet.create({
  Shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity: 0.2,
    backgroundColor: 'transparent',
  },
});

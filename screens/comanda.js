import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modalbox";
import { MaterialIcons } from '@expo/vector-icons';
import Carrinho from '../shared/Carrinho';
import Participantes from '../shared/Participantes';
import Consumo from '../shared/Consumo';
import PopUpMsg from '../shared/PopUpMsg'
import {abrirComanda, chamarGarcom} from '../actions/comandaActions';
import {useSelector, useDispatch} from 'react-redux';
import { carregarConsumo } from '../actions/consumoActions';

// Estilo Global
import {globalStyles} from '../styles/global';
import { setComanda } from '../actions/userActions';

export default function Comanda({navigation}){

  const dispatch = useDispatch();

  const comanda = useSelector((state) => state.comanda);

  const consumo = useSelector(state => state.consumo);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    if(consumo.isLoading) {
      dispatch(carregarConsumo(user.comanda));
    }
  }, []);

  const [modalVisible, setModalVisible] = useState(true);

  const [moneyPayment, setMoneyPayment] = useState(true);

  const RadioButton = (isActive) => {
    return (
        <View style={{
          height: 24,
          width: 24,
          borderRadius: 12,
          borderWidth: 2,
          borderColor: '#000',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {
            isActive ?
              <View style={{
                height: 12,
                width: 12,
                borderRadius: 6,
                backgroundColor: '#000',
              }}/>
              : null
          }
        </View>
    );
  }

  const dealPopUp = () => {
    if(!comanda.chamando) {
      Alert.alert("Aguarde...", "Um garçom irá até a sua mesa!");
    }
    
    dispatch(chamarGarcom());
  }

  return (
      <Modal
        style= {styles.modalView}
        swipeToClose={false}
        backdropOpacity={0}
        position= {"bottom"}
        isOpen={modalVisible}
        onClosed={() => {
          setModalVisible(false);
          navigation.goBack()
          }}
      >
      <View style={{...globalStyles.container}}>
      <FlatList
        listkey={0}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
        <View>
          <View style={{display: 'flex', flexDirection: 'row',  justifyContent: 'space-between', alignItems: 'center', marginBottom: 5, marginTop: 5}}>
            <View>
              <Text style={{...globalStyles.h5}}>Atalhos</Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack()
                }}
                >
                <Text style={{...globalStyles.h4, padding: '5%'}}>X</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View>
          {/* Seção atalhos */} 
          {/* 3 botões */}
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', height: 94}}> 
            {/* Botão cardápio */}
            <View style={{height: '100%', width: '29%'}}>
              <View style={styles.buttonShadow}>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                    style={{width: '100%', height: '100%'}}
                  >
                    <View style={{...styles.buttonStyle}}>
                      <View>
                        <MaterialIcons name="book" size={20} color={globalStyles.branco1.color}/>
                      </View>
                      <Text style={{color: globalStyles.branco1.color, marginTop: 5}}>Abrir cardápio</Text>
                    </View>  
                  </TouchableOpacity>  
                </View>        
            </View>
            {/* Botão Garçom */}
            <View style={{height: '100%', width: '30%'}}>
              <View style={styles.buttonShadow}>
                <TouchableOpacity
                  onPress={() => {
                    dealPopUp()
                  } 
                  }
                    style={{width: '100%', height: '100%'}}
                  >
                    <View style={(comanda.chamando) ? {...styles.buttonStyle, backgroundColor: "green"} : {...styles.buttonStyle}}>
                      <View>
                        <MaterialIcons name="pan-tool" size={20} color={globalStyles.branco1.color}/>
                      </View>
                      {
                        comanda.chamando ?
                          <Text style={{color: globalStyles.branco1.color, marginTop: 5}}>Chamando garçom...</Text>
                        :
                          <Text style={{color: globalStyles.branco1.color, marginTop: 5}}>Chamar garçom</Text>
                      }
                    </View>  
                  </TouchableOpacity>  
                </View>        
            </View>
            {/* Botão Comanda */}
            <View style={{height: '100%', width: '30%'}}>
              <View style={styles.buttonShadow}>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                    style={{width: '100%', height: '100%'}}
                  >
                    <View style={{...styles.buttonStyle}}>
                      <View>
                        <MaterialIcons name="settings" size={20} color={globalStyles.branco1.color}/>
                      </View>
                      <Text style={{color: globalStyles.branco1.color, marginTop: 5}}>Gerenciar comanda</Text>
                    </View>  
                  </TouchableOpacity>  
                </View>        
            </View>
          </View>

        <Text style={{...globalStyles.h5, marginBottom: 15, marginTop: 40}}>Meu carrinho</Text> 
    
        <Carrinho user={user} comanda={comanda} />

        <View style={{borderWidth: 1,  borderColor: globalStyles.branco5.color, marginTop: 40, marginBottom: 40}} />
          
        <Participantes />

        <View style={{marginTop: 30}} />
        
        <Consumo consumo={consumo.participantes} />

        <Text style={{...globalStyles.h5, marginBottom: 30, marginTop: 30}}>Pagamento</Text> 

        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
          <TouchableOpacity onPress={() => setMoneyPayment(true)}>
            {RadioButton(moneyPayment)}
          </TouchableOpacity>
          <Text style={{...globalStyles.sub1, marginLeft:5}}>Dinheiro</Text>
        </View>
        
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => setMoneyPayment(false)}>
          {RadioButton(!moneyPayment)}
          </TouchableOpacity>
          <Text style={{...globalStyles.sub1, marginLeft:5}}>Cartão de crédito/débito</Text>
        </View>

        <View style={{height: 47, width: '44%', alignSelf: 'center', marginTop: '12%'}}>
          <View style={styles.buttonShadow}>
            <TouchableOpacity
              onPress={() => {
                dispatch(setComanda(null, user.id));
                setModalVisible(false);
                navigation.goBack()
              }}
                style={{width: '100%', height: '100%'}}
              >
                <View style={{...styles.buttonStyle, paddingLeft: 0}}>
                  {comanda.owner ? 
                  <Text style={{color: globalStyles.branco1.color, textAlign: 'center'}}>Fechar conta</Text> 
                  :
                  <Text style={{color: globalStyles.branco1.color, textAlign: 'center'}}>Sair</Text>
                  }
                  
                </View>  
              </TouchableOpacity>  
            </View>        
        </View>
        
        <View style={{marginBottom: 100}}></View>

        </View>
        </View>
      }
      />
      </View>
      </Modal>

);
};

const styles = StyleSheet.create({
  
  modalView: {
    height: "88%",
    backgroundColor: globalStyles.branco2.color,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.2,
  }, 
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
    paddingLeft: 8,
  }

});
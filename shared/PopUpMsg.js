import React, { useState } from 'react'
import {Text, View, StyleSheet, Image} from 'react-native';
import Modal from "react-native-modalbox";
import { MaterialIcons } from '@expo/vector-icons'; 
// Estilo Global
import {globalStyles} from '../styles/global';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function PopUpMsg({message, isOpen, isOk, onClosed}){
    return(
        <Modal
        style={styles.modalView}
        backdropOpacity={0.5}
        onClosed={onClosed}
        isOpen={isOpen}>
            <View style={{marginTop:"15%", alignItems:'center'}}>
                {isOk ? (<Image source={require('../assets/icons/trueOK.png')}  />):(<Image source={require('../assets/icons/falseOK.png')} />)}
                <Text style={{...globalStyles.sub2,marginTop:"5%",textAlign:'center', paddingBottom:"7%",paddingRight:"7%",paddingLeft:"7%"}}>{message}</Text>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalView: {
        flex:1,

        maxHeight: "30%",
        width:"91%",
        alignContent:'center',
        alignItems:"center",
       paddingBottom:"20%",
        backgroundColor: globalStyles.branco2.color,
        borderRadius:14,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.2,
      }, 
})
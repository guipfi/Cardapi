import React from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import {globalStyles} from '../styles/global';

export default function InputNormal({label,placeholder,onChangeText,value, keyboardType,iconName, onPress,editable, secureTextEntry, multiline}){
    if(iconName){
        return(
            <View style={{...styles.inputLabel}}>
                <Text style={{...globalStyles.legenda2, ...globalStyles.preto2, marginTop:"4%"}}>{label}</Text>
                <View style={styles.passwordEye}>
                    <TextInput 
                        multiline={multiline}
                        style={{marginBottom:"3%", ...globalStyles.body1, flex:1,minWidth:"88%"}}
                        placeholder={placeholder}
                        onChangeText={onChangeText}
                        value={value}
                        secureTextEntry={secureTextEntry}
                        keyboardType={keyboardType}
                        editable={editable}
                    />
                    <View style={{marginBottom:"4%", marginRight:"3%"}}>
                        <TouchableOpacity onPress={onPress}>
                            <MaterialIcons name={iconName} size={24} color="black"/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    return(
        <View style={styles.inputLabel}>
            <Text style={{...globalStyles.legenda2, ...globalStyles.preto2, marginTop:"4%"}}>{label}</Text>
            <TextInput 
                style={{marginBottom:"3%", ...globalStyles.body1}}
                placeholder={placeholder}
                onChangeText={onChangeText}
                value={value}
                keyboardType={keyboardType}
            />
        </View>
    )

}

const styles = StyleSheet.create({
    inputLabel:{
        paddingLeft:"5%",
        marginTop:"3.125%",
        borderRadius:8,
        minWidth:"88%",
        height:45,
        justifyContent:'center',
        backgroundColor:"#E5E5E5",
    },
    passwordEye:{
        flexDirection:'row',
        justifyContent:'space-between'
    },


})
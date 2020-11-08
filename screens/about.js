import React from 'react';
import {View, Text,StyleSheet,ScrollView,Image} from 'react-native';

// Estilo Global
import {globalStyles} from '../styles/global';

export default function About(){
    return(
        <View style={{backgroundColor:"white", marginBottom:"50%"}}>
            <Image source={require('../assets/images/quem_somos_programadores.png')}  style={{width:"87%",height:"33%",alignSelf:'center'}}/>
            <View>
                <View style={styles.container}>
                    <View style={{flexDirection:"row", alignItems:"center"}}>
                        <Image source={require('../assets/icon.png')} style={{width:49, height:47}} />
                        <Text style={{...globalStyles.h5, marginLeft:"1.11%"}}>CARDAPI</Text>
                    </View>

                    <Text style={styles.textBody}>
                        Somos uma FoodTech fundada em 2020 focada em proporcionar a melhor experiência para o processo de pedidos em restaurantes. 
                        Nossa missão é impactar estabelecimentos e clientes, não abrindo mão da qualidade para o usuário.
                    </Text>
                    <Text style={styles.textBody}>
                        Para isso, as pessoas terão acesso ao cardápio digital dos estabelecimentos e, também, a desafios em troca de prêmios.
                    </Text>
                    
                    <Text style={{...globalStyles.body1, marginTop:"5%"}}>- Equipe Cardapi 2020</Text>
                </View>
            </View>
        </View>

    );


}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#F2F2F2",
        height:352,
        borderTopLeftRadius:16,
        borderTopRightRadius:16,
        padding:"4.7%"
    },
    textBody:{
        ...globalStyles.body2,
        textAlign:"justify",
        marginTop:"3.69%"
    }
})  
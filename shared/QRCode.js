import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { globalStyles } from '../styles/global';

export default function QRCode({autenticar}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    autenticar(data);
  };

  if (hasPermission === null) {
    return <Text>Requisitando acesso à camera.</Text>;
  }
  if (hasPermission === false) {
    return <Text>O acesso à câmera não foi permitido.</Text>;
  }

  return (
    <View style={{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-end',
    }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Pressione para scanear novamente'} onPress={() => setScanned(false)} />}
    </View>
  );
}
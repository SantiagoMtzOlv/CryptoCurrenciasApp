import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableHighlight, Alert} from 'react-native';
import {Picker} from '@react-native-community/picker';
import axios from 'axios';
const Formulario = ({
  moneda,
  cryptomoneda,
  setMoneda,
  setCryptomoneda,
  setConsultarAPI,
}) => {
  const [cryptomonedas, setCryptomonedas] = useState([]);
  useEffect(() => {
    const consultarAPI = async () => {
      const url =
        'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
      const resultado = await axios.get(url);
      setCryptomonedas(resultado.data.Data);
    };
    consultarAPI();
  }, []);

  const cotizarPrecio = () => {
    if (moneda.trim() === '' || cryptomoneda.trim() === '') {
      alerta();
      return;
    }
    //Pasa la validacion
    setConsultarAPI(true);
  };
  const alerta = () => {
    Alert.alert('Error...', 'Ambos Campos son obligatorios', [{text: 'OK'}]);
  };

  //Almacena las selecciones del usuario
  const obtenerMoneda = moneda => {
    setMoneda(moneda);
  };
  const obtenerCriptoMoneda = cryptomoneda => {
    setCryptomoneda(cryptomoneda);
  };
  return (
    <View>
      <Text style={styles.label}>Moneda</Text>
      <Picker
        onValueChange={moneda => obtenerMoneda(moneda)}
        selectedValue={moneda}
        itemStyle={{height: 120}}>
        <Picker.Item label="- Seleccione -" value="" />
        <Picker.Item label="Dolar de Estados Unidos" value="USD" />
        <Picker.Item label="Peso Mexicano" value="MXN" />
        <Picker.Item label="Euro" value="EUR" />
        <Picker.Item label="Libra Esterlina" value="GBP" />
      </Picker>
      <Text style={styles.label}>Criptomoneda</Text>
      <Picker
        onValueChange={cryptomoneda => obtenerCriptoMoneda(cryptomoneda)}
        selectedValue={cryptomoneda}
        itemStyle={{height: 120}}>
        <Picker.Item label="- Seleccione -" value="" />
        {cryptomonedas.map(cripto => (
          <Picker.Item
            key={cripto.CoinInfo.Id}
            label={cripto.CoinInfo.FullName}
            value={cripto.CoinInfo.Name}
          />
        ))}
      </Picker>
      <TouchableHighlight
        style={styles.btnCotizar}
        onPress={() => cotizarPrecio()}>
        <Text style={styles.textoCotizar}>Cotizar</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 22,
    marginVertical: 20,
    textTransform: 'uppercase',
  },
  btnCotizar: {
    backgroundColor: '#5E49E2',
    padding: 10,
    marginTop: 20,
    borderRadius: 20,
  },
  textoCotizar: {
    color: '#FFF',
    fontSize: 18,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});
export default Formulario;

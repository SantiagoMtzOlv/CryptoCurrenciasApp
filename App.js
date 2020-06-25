import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Image,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Header from './components/Header';
import Formulario from './components/Formulario';
import axios from 'axios';
import Cotizacion from './components/Cotizacion';
const App = () => {
  const [moneda, setMoneda] = useState('');
  const [cryptomoneda, setCryptomoneda] = useState('');
  const [consultarAPI, setConsultarAPI] = useState(false);
  const [cotizacion, setCotizacion] = useState({});
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const cotizarCriptomoneda = async () => {
      if (consultarAPI) {
        //Consultar la API para obtener la cotizacion
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptomoneda}&tsyms=${moneda}`;
        const resultado = await axios.get(url);

        setCargando(true);
        //Ocultar el spinner y mostrar resultado
        setTimeout(() => {
          setCotizacion(resultado.data.DISPLAY[cryptomoneda][moneda]);
          setConsultarAPI(false);
          setCargando(false);
        }, 3000);
      }
    };
    cotizarCriptomoneda();
  }, [consultarAPI]);

  //Mostrar spinner o resultado
  const componente = cargando ? (
    <ActivityIndicator size="large" color="#5E49E2" />
  ) : (
    <Cotizacion cotizacion={cotizacion} />
  );

  return (
    <>
      <ScrollView>
        <Header />
        <Image
          source={require('./assets/img/cryptomonedas.png')}
          style={styles.imagen}
        />
        <View style={styles.contendio}>
          <Formulario
            moneda={moneda}
            cryptomoneda={cryptomoneda}
            setMoneda={setMoneda}
            setCryptomoneda={setCryptomoneda}
            setConsultarAPI={setConsultarAPI}
          />
        </View>
        <View style={{marginTop: 40}}>{componente}</View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  imagen: {
    width: '100%',
    height: 150,
    marginHorizontal: '2.5%',
  },
  contendio: {
    marginHorizontal: '2.5%',
  },
});

export default App;

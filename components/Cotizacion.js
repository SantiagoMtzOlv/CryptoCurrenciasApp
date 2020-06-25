import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
const Cotizacion = ({cotizacion}) => {
  if (Object.keys(cotizacion).length === 0) return null;
  return (
    <View style={styles.resultado}>
      <Text style={[styles.text, styles.precio]}>
        <Text style={styles.span}>{cotizacion.PRICE}</Text>
      </Text>
      <Text style={styles.text}>
        Precio más alto del día:{' '}
        <Text style={styles.span}>{cotizacion.HIGHDAY}</Text>
      </Text>
      <Text style={styles.text}>
        Precio más bajo del día:{' '}
        <Text style={styles.span}>{cotizacion.LOWDAY}</Text>
      </Text>
      <Text style={styles.text}>
        Variación últimas 24 horas:{' '}
        <Text style={styles.span}>{cotizacion.CHANGEPCT24HOUR}</Text>
      </Text>
      <Text style={styles.text}>
        Última actualización:{' '}
        <Text style={styles.span}>{cotizacion.LASTUPDATE}</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  resultado: {
    backgroundColor: '#5E49E2',
    padding: 20,
    marginTop: 20,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'normal',
    marginBottom: 10,
  },
  precio: {
    fontSize: 30,
  },
  span: {
    fontWeight: 'bold',
  },
});

export default Cotizacion;

import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Olá, mundo!</Text>
      <Text style={styles.subtitulo}>Estou na tela Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8f0ff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subtitulo: {
    fontSize: 18,
  },
});
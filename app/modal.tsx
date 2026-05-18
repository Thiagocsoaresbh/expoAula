// Importa useRouter para navegar entre telas via código
import { useRouter } from 'expo-router';

// Importa os componentes básicos do React Native
import { Pressable, StyleSheet, Text, View } from 'react-native';

// Essa tela é aberta como MODAL DE ROTA pelo Expo Router
// É diferente do <Modal> componente do React Native usado no explore.tsx:
//   → <Modal> aparece por cima da tela atual, sem trocar de rota
//   → Esta tela aqui é uma rota separada aberta via router.push('/modal')
export default function ModalScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>Modal de Rota</Text>

      <Text style={styles.descricao}>
        Este modal foi aberto via{' '}
        <Text style={styles.destaque}>router.push('/modal')</Text>
        {' '}a partir da tela Home.{'\n\n'}
        É uma tela separada — diferente do componente{' '}
        <Text style={styles.destaque}>&lt;Modal&gt;</Text>
        {' '}do React Native, que aparece por cima da mesma tela sem trocar de rota.
      </Text>

      {/* router.back() volta para a tela anterior sem empilhar no histórico */}
      <Pressable style={styles.botao} onPress={() => router.back()}>
        <Text style={styles.textoBotao}>Voltar</Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaf2ff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 28,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1e3a5f',
    marginBottom: 16,
    textAlign: 'center',
  },
  descricao: {
    fontSize: 15,
    color: '#4b5563',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 32,
  },
  destaque: {
    fontWeight: 'bold',
    color: '#2563eb',
  },
  botao: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
  },
  textoBotao: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
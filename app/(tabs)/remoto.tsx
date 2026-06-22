// ─────────────────────────────────────────────────────────────────────────────
// FLUXO DE CONSTRUÇÃO — Tela de Conexão Remota: remoto.tsx
// Demonstra o consumo de uma API REST externa: GET (Fetch) e POST (Axios).
// Construa este arquivo APÓS dados/ApiRemota.ts.
// ─────────────────────────────────────────────────────────────────────────────

// ── PASSO 1 — Imports ────────────────────────────────────────────────────────

// 1.1 useEffect → executa código quando a tela é exibida (ex: carregar dados)
//     useState   → cria variáveis reativas
import { useEffect, useState } from 'react';

// 1.2 Componentes do React Native usados na tela
//     ActivityIndicator → spinner de carregamento nativo
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

// 1.3 Importa a camada de conexão remota e o tipo dos dados retornados
//     → Construída em dados/ApiRemota.ts
import { ApiRemota, PostRemoto } from '../../dados/ApiRemota';

// ── PASSO 2 — Componente da tela ─────────────────────────────────────────────

export default function RemotoScreen() {

  // 2.1 Lista de posts vindos da API (preenchida pelo GET)
  const [posts, setPosts] = useState<PostRemoto[]>([]);

  // 2.2 Indica se a busca GET ainda está em andamento (mostra um spinner)
  const [carregando, setCarregando] = useState(true);

  // 2.3 Campos do formulário usado no POST
  const [titulo, setTitulo] = useState('');
  const [corpo, setCorpo] = useState('');

  // 2.4 Indica se o envio POST está em andamento (desabilita o botão)
  const [enviando, setEnviando] = useState(false);

  // ── PASSO 3 — Carregamento inicial (GET) ───────────────────────────────────

  // 3.1 useEffect com array de dependências vazio [] → executa só UMA VEZ,
  //     quando a tela é montada (mesma ideia do exemplo de Fetch do conteúdo)
  useEffect(() => {
    carregarPosts();
  }, []);

  // 3.2 Busca os posts remotos e atualiza o estado da lista
  async function carregarPosts() {
    try {
      setCarregando(true);

      // 3.3 ApiRemota.listar() → faz um GET com Fetch API
      //     → dados/ApiRemota.ts (Passo 4)
      const lista = await ApiRemota.listar();
      setPosts(lista);

    } catch {
      // 3.4 Erros de rede (sem internet, servidor fora etc.) caem aqui
      Alert.alert('Erro', 'Não foi possível buscar os dados remotos.');

    } finally {
      // 3.5 "finally" sempre executa, com sucesso ou erro
      //     Garante que o spinner sempre pare, não importa o resultado
      setCarregando(false);
    }
  }

  // ── PASSO 4 — Envio do formulário (POST) ───────────────────────────────────

  // 4.1 Executa ao pressionar o botão "Enviar"
  async function enviarPost() {

    // 4.2 Validação básica dos campos
    if (!titulo.trim() || !corpo.trim()) {
      Alert.alert('Atenção', 'Preencha título e corpo antes de enviar.');
      return;
    }

    try {
      setEnviando(true);

      // 4.3 ApiRemota.criar() → faz um POST com Axios
      //     → dados/ApiRemota.ts (Passo 6)
      const novoPost = await ApiRemota.criar(titulo.trim(), corpo.trim());

      // 4.4 A API fake devolve um "id" simulado para o post criado
      Alert.alert('Enviado!', `Post criado com id simulado: ${novoPost.id}`);

      // 4.5 Limpa os campos após o envio
      setTitulo('');
      setCorpo('');

    } catch {
      Alert.alert('Erro', 'Não foi possível enviar o post.');

    } finally {
      setEnviando(false);
    }
  }

  // ── PASSO 5 — Interface visual ──────────────────────────────────────────────

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>Conexão Remota (API REST)</Text>

      {/* 5.1 Seção GET — lista de posts vindos da internet via Fetch API */}
      <Text style={styles.secao}>GET com Fetch API</Text>

      {carregando ? (
        <ActivityIndicator size="small" color="#2563eb" />
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Text style={styles.itemLista}>• {item.title}</Text>
          )}
          style={styles.lista}
        />
      )}

      {/* 5.2 Seção POST — formulário para enviar dados à API via Axios */}
      <Text style={styles.secao}>POST com Axios</Text>

      <TextInput
        style={styles.campo}
        placeholder="Título"
        placeholderTextColor="#9ca3af"
        value={titulo}
        onChangeText={setTitulo}
      />

      <TextInput
        style={styles.campo}
        placeholder="Corpo"
        placeholderTextColor="#9ca3af"
        value={corpo}
        onChangeText={setCorpo}
      />

      {/* 5.3 "disabled" evita múltiplos envios enquanto a requisição roda */}
      <Pressable
        style={[styles.botaoEnviar, enviando && styles.botaoDesabilitado]}
        onPress={enviarPost}
        disabled={enviando}
      >
        <Text style={styles.textoBotao}>
          {enviando ? 'Enviando...' : 'Enviar'}
        </Text>
      </Pressable>

    </View>
  );
}

// ── PASSO 6 — Estilos ────────────────────────────────────────────────────────

const styles = StyleSheet.create({

  // 6.1 Container principal
  container: {
    flex: 1,
    backgroundColor: '#f4f6fb',
    padding: 16,
    paddingTop: 20,
  },

  // 6.2 Título da tela
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e3a5f',
    marginBottom: 12,
  },

  // 6.3 Subtítulo de cada seção (GET / POST)
  secao: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
    marginTop: 16,
    marginBottom: 8,
  },

  // 6.4 Lista de posts vindos do GET
  lista: {
    maxHeight: 160,
  },

  // 6.5 Cada linha da lista de posts
  itemLista: {
    fontSize: 14,
    color: '#1a1a1a',
    paddingVertical: 4,
  },

  // 6.6 Campos do formulário de POST
  campo: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 10,
    padding: 14,
    fontSize: 15,
    color: '#1a1a1a',
    marginBottom: 12,
  },

  // 6.7 Botão "Enviar"
  botaoEnviar: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },

  // 6.8 Estado visual do botão enquanto a requisição está em andamento
  botaoDesabilitado: {
    opacity: 0.6,
  },

  // 6.9 Texto do botão
  textoBotao: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },

});
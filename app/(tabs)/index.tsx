// ─────────────────────────────────────────────────────────────────────────────
// FLUXO DE CONSTRUÇÃO — Tela Home (index.tsx)
// Siga os passos em ordem. Quando chegar no Passo 3, pause e construa
// o componente BlocoAula.tsx antes de continuar para o Passo 4.
// ─────────────────────────────────────────────────────────────────────────────

// ── PASSO 1 — Imports ────────────────────────────────────────────────────────

// 1.1 useRouter → hook do Expo Router que permite navegar entre telas via código
import { useRouter } from 'expo-router';

// 1.2 Componentes visuais do React Native usados nessa tela
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

// 1.3 Componente reutilizável que criamos para exibir blocos educativos
//     ⚠ Antes de continuar para o Passo 4, veja o FLUXO DE CONSTRUÇÃO em:
//     → components/BlocoAula.tsx (construído no Passo 3 abaixo)
import { BlocoAula } from '../../components/BlocoAula';

// ── PASSO 2 — Componente e navegação ─────────────────────────────────────────

// 2.1 Cria e exporta a tela Home
export default function HomeScreen() {

  // 2.2 Hook de navegação — permite trocar de tela chamando funções
  const router = useRouter();

  // 2.3 Navega para a tela Prática (explore.tsx)
  function irParaPratica() {
    router.push('/explore');
  }

  // 2.4 Abre o modal de rota (modal.tsx)
  function abrirModalDaRota() {
    router.push('/modal');
  }

  // 2.5 O return define tudo que será exibido visualmente na tela
  return (

    // 2.6 ScrollView com rolagem — necessário pois o conteúdo é longo
    <ScrollView style={styles.container} contentContainerStyle={styles.conteudo}>

      {/* ── CARD DO MÓDULO ──────────────────────────────────────────────── */}

      {/* 2.7 Card de apresentação do módulo atual */}
      <View style={styles.cardModulo}>
        <Text style={styles.tagModulo}>Módulo em estudo</Text>
        <Text style={styles.tituloModulo}>Persistência de Dados</Text>
        <Text style={styles.subtituloModulo}>com React Native</Text>
        <Text style={styles.autorModulo}>Prof. Denis Gonçalves Cople</Text>
      </View>

      {/* ── PASSO 3 — Percebemos a repetição, hora de criar o componente ── */}
      {/* 3.1 Usamos BlocoAula para cada seção do conteúdo introdutório     */}
      {/* ⚠ PAUSE AQUI se ainda não criou → components/BlocoAula.tsx        */}

      {/* ── PASSO 4 — Blocos de introdução do módulo ────────────────────── */}

      {/* 4.1 Propósito do módulo */}
      <BlocoAula
        titulo="Propósito"
        descricao="Ao final dos estudos, você deverá estar apto a construir aplicativos com persistência de dados, utilizando diversas metodologias: AsyncStorage, SQLite, Realm e MongoDB."
      />

      {/* 4.2 O que precisa estar instalado antes de começar */}
      <BlocoAula
        titulo="Preparação do ambiente"
        descricao="É necessário ter instalado: JDK, Android Studio, VS Code, Node.js e MongoDB. Via NPM ou Yarn, instale react-native-cli e expo-cli. No celular, instale o aplicativo Expo."
      />

      {/* 4.3 O que será aprendido ao longo do módulo */}
      <BlocoAula
        titulo="Objetivos do módulo"
        descricao="1. AsyncStorage → persistência local com chave-valor.&#10;2. SQLite → modelo relacional.&#10;3. Realm → modelo orientado a objetos.&#10;4. MongoDB → modelo NoSQL com armazenamento remoto."
      />

      {/* 4.4 Conceito de serialização */}
      <BlocoAula
        titulo="Serialização"
        descricao="Serialização é transformar um objeto (espalhado na memória) em um formato contíguo para armazenar ou transmitir. No React Native usamos JSON — ex: JSON.stringify(objeto) para serializar e JSON.parse(texto) para de-serializar."
      />

      {/* 4.5 Conceito de persistência */}
      <BlocoAula
        titulo="Persistência"
        descricao="Uma estrutura persistente é aquela capaz de guardar seu estado em meio não volátil (disco). No React Native, como o ambiente móvel exige operações assíncronas, usaremos async/await para não travar a interface."
      />

      {/* 4.6 O que é AsyncStorage */}
      <BlocoAula
        titulo="AsyncStorage"
        descricao="É a forma mais simples de persistência no React Native. Funciona com pares chave-valor, parecido com uma chave primária num banco. Os objetos precisam ser serializados em JSON antes de serem guardados."
      />

      {/* 4.7 O que vamos construir na prática */}
      <BlocoAula
        titulo="O que vamos construir"
        descricao="Um app de cadastro de produtos com: listagem (FlatList), formulário de inclusão (TextInput) e exclusão de itens. Os dados serão persistidos localmente via AsyncStorage — mesmo fechando o app, a lista é mantida."
      />

      {/* ── CARD DE NAVEGAÇÃO ────────────────────────────────────────────── */}

      {/* 2.8 Card com botões de ação para navegar para outras telas */}
      <View style={styles.cardAcoes}>
        <Text style={styles.tituloAcoes}>Explore o projeto</Text>

        {/* 2.9 Botão que navega para a tela de exemplos práticos */}
        <Pressable style={styles.botaoPrimario} onPress={irParaPratica}>
          <Text style={styles.textoBotaoPrimario}>Ver exemplos práticos</Text>
        </Pressable>

        {/* 2.10 Botão que abre o modal de rota */}
        <Pressable style={styles.botaoSecundario} onPress={abrirModalDaRota}>
          <Text style={styles.textoBotaoSecundario}>Abrir modal da rota</Text>
        </Pressable>
      </View>

    </ScrollView>
  );
}

// ── PASSO 5 — Estilos ────────────────────────────────────────────────────────

const styles = StyleSheet.create({

  // 5.1 Container externo com rolagem
  container: {
    flex: 1,
    backgroundColor: '#eaf2ff',
  },

  // 5.2 Espaçamento interno do conteúdo
  conteudo: {
    padding: 20,
    paddingBottom: 32,
  },

  // 5.3 Card do módulo em estudo (topo da tela)
  cardModulo: {
    backgroundColor: '#1e3a5f',  // azul escuro — destaque de módulo
    borderRadius: 22,
    padding: 28,
    marginBottom: 20,
    alignItems: 'center',
  // Sombra iOS
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    // Sombra Android
    elevation: 6,
  },

  // 5.4 Tag "Módulo em estudo"
  tagModulo: {
    fontSize: 11,
    fontWeight: '700',
    color: '#93c5fd',           // azul claro
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 12,
  },

  // 5.5 Título principal do módulo
  tituloModulo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 36,
  },

  // 5.6 Subtítulo do módulo
  subtituloModulo: {
    fontSize: 18,
    fontWeight: '600',
    color: '#93c5fd',
    textAlign: 'center',
    marginBottom: 16,
  },

  // 5.7 Nome do professor
  autorModulo: {
    fontSize: 13,
    color: '#cbd5e1',           // cinza azulado claro
    fontStyle: 'italic',
  },

  // 5.8 Card de botões de navegação (rodapé da tela)
  cardAcoes: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 20,
    marginTop: 4,
    // Sombra iOS
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    // Sombra Android
    elevation: 3,
  },

  // 5.9 Título do card de ações
  tituloAcoes: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e3a5f',
    marginBottom: 14,
    textAlign: 'center',
  },

  // 5.10 Botão primário (azul sólido)
  botaoPrimario: {
    width: '100%',
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 10,
  },

  // 5.11 Texto do botão primário
  textoBotaoPrimario: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },

  // 5.12 Botão secundário (azul claro)
  botaoSecundario: {
    width: '100%',
    backgroundColor: '#dbeafe',
    paddingVertical: 14,
    borderRadius: 12,
  },

  // 5.13 Texto do botão secundário
  textoBotaoSecundario: {
    color: '#1d4ed8',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },

});
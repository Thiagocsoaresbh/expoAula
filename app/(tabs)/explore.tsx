// useState é um hook do React que cria variáveis reativas
// Quando o valor muda, a tela re-renderiza automaticamente mostrando o novo estado
import { useState } from 'react';

// Importa os componentes do React Native usados nessa tela:
// ActivityIndicator → ícone animado de carregamento (spinner)
// Modal             → exibe conteúdo por cima da tela atual (sem trocar de rota)
// Pressable         → área clicável, como um botão customizável
// ScrollView        → permite rolagem do conteúdo quando ele ultrapassa a tela
// StyleSheet        → organiza estilos em um único objeto
// Text              → exibe textos na tela
// TextInput         → campo de entrada de texto (usado no card do AsyncStorage)
// View              → container para agrupar elementos (como uma "div" no HTML)
import {
  ActivityIndicator,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

// SafeAreaView vem de um pacote separado (react-native-safe-area-context)
// O SafeAreaView do react-native está depreciado — este aqui é o correto e atualizado
// Ele protege o conteúdo das áreas sensíveis da tela (notch, câmera, barra de status)
import { SafeAreaView } from 'react-native-safe-area-context';

// AsyncStorage → biblioteca de persistência local (chave-valor)
// Usada aqui para demonstrar setItem e getItem de forma isolada
import AsyncStorage from '@react-native-async-storage/async-storage';

// Importa a classe Produto para demonstrar serialização com um objeto real
// → Construída em dados/Produto.ts
import { Produto } from '../../dados/Produto';

// Componente da tela "Prática"
export default function ExploreScreen() {

  // Estado que controla se o Modal está visível ou não
  // false = modal fechado | true = modal aberto
  const [modalVisible, setModalVisible] = useState(false);

  // Estado que controla se o indicador de carregamento está ativo
  // false = não está carregando | true = está carregando
  const [carregando, setCarregando] = useState(false);

  // ── Estados do card de Serialização ────────────────────────────────────────

  // Guarda o resultado do JSON.stringify — começa null (nada exibido ainda)
  const [jsonStringificado, setJsonStringificado] = useState<string | null>(null);

  // Guarda o objeto recuperado pelo JSON.parse — começa null
  const [objetoRecuperado, setObjetoRecuperado] = useState<Produto | null>(null);

  // ── Estados do card de AsyncStorage direto ─────────────────────────────────

  // Valor digitado pelo usuário no campo de texto do tema
  const [valorTema, setValorTema] = useState('');

  // Valor recuperado do AsyncStorage ao pressionar "Recuperar"
  const [temaRecuperado, setTemaRecuperado] = useState<string | null>(null);

  // Função que simula um carregamento de 2,5 segundos
  function simularCarregamento() {
    setCarregando(true);
    setTimeout(() => {
      setCarregando(false);
    }, 2500);
  }

  // ── Funções do card de Serialização ────────────────────────────────────────

  // Cria um Produto de exemplo, serializa e de-serializa — mostra os resultados
  function demonstrarSerializacao() {

    // 1. Cria um objeto Produto usando o construtor
    const prod1 = new Produto(1, 'Teclado', 50);

    // 2. JSON.stringify → transforma o objeto em texto JSON contíguo
    //    Esse texto pode ser armazenado em disco ou transmitido pela rede
    const prod1Str = JSON.stringify(prod1);
    setJsonStringificado(prod1Str);

    // 3. JSON.parse → transforma o texto JSON de volta em objeto JavaScript
    //    É o processo inverso — chamado de "de-serialização"
    const prod2: Produto = JSON.parse(prod1Str);
    setObjetoRecuperado(prod2);
  }

  // Limpa os resultados da demonstração
  function limparSerializacao() {
    setJsonStringificado(null);
    setObjetoRecuperado(null);
  }

  // ── Funções do card de AsyncStorage direto ─────────────────────────────────

  // Salva o tema digitado no AsyncStorage usando setItem
  async function salvarTema() {
    try {
      // setItem(chave, valor) → guarda o par no armazenamento local
      await AsyncStorage.setItem('tema', valorTema);
    } catch (e) {}
  }

  // Recupera o tema salvo no AsyncStorage usando getItem
  async function recuperarTema() {
    try {
      // getItem(chave) → busca o valor associado à chave
      // Retorna null se a chave não existir
      const valor = await AsyncStorage.getItem('tema');
      setTemaRecuperado(valor);
    } catch (e) {}
  }

  return (
    // ─────────────────────────────────────────────────────────────────
    // SafeAreaView vs ScrollView — qual a diferença?
    //
    // SafeAreaView → protege o conteúdo das áreas recortadas do celular
    //                (notch, câmera, barra de status, barra de gestos)
    //                Não adiciona rolagem — apenas cria margens seguras
    //
    // ScrollView   → permite que o conteúdo role verticalmente (ou horizontalmente)
    //                quando ele for maior do que a altura visível da tela
    //                Não protege das áreas recortadas por si só
    //
    // Resultado: usamos os dois juntos — SafeAreaView por fora protege as bordas,
    // ScrollView por dentro deixa o conteúdo rodar dentro dessa área segura
    // ─────────────────────────────────────────────────────────────────
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.conteudo}>

        {/* Título da tela */}
        <Text style={styles.titulo}>Exemplos práticos da aula</Text>

        {/* Subtítulo descritivo */}
        <Text style={styles.subtitulo}>
          Esta tela demonstra, na prática, alguns componentes importantes para interfaces mobile.
        </Text>

        {/* ── CARD 1: View ───────────────────────────────────────────── */}
        <View style={styles.card}>
          <Text style={styles.cardTitulo}>View como container</Text>
          <Text style={styles.cardTexto}>
            A View organiza os elementos em blocos. É o container principal usado para estruturar a interface.
          </Text>

          {/* Exemplo visual: duas Views lado a lado usando flexDirection: 'row' */}
          <View style={styles.exemploLinha}>
            <View style={styles.caixaAzul}>
              <Text style={styles.textoCaixa}>Bloco 1</Text>
            </View>
            <View style={styles.caixaClara}>
              <Text style={styles.textoCaixaEscuro}>Bloco 2</Text>
            </View>
          </View>
        </View>

        {/* ── CARD 2: ScrollView + SafeAreaView ──────────────────────── */}
        <View style={styles.card}>
          <Text style={styles.cardTitulo}>ScrollView + SafeAreaView</Text>
          <Text style={styles.cardTexto}>
            O ScrollView permite rolagem quando houver muito conteúdo na tela.{'\n\n'}
            O SafeAreaView protege o conteúdo de ser cortado nas bordas do celular (notch, câmera frontal, barra de status).{'\n\n'}
            Eles se complementam: SafeAreaView cuida das bordas, ScrollView cuida da rolagem.
          </Text>
        </View>

        {/* ── CARD 3: Modal ──────────────────────────────────────────── */}
        <View style={styles.card}>
          <Text style={styles.cardTitulo}>Modal</Text>
          <Text style={styles.cardTexto}>
            O Modal exibe conteúdo por cima da tela atual, sem trocar de rota.{'\n\n'}
            É diferente do modal de rota (modal.tsx): aquele é uma tela separada
            aberta via router.push(). Este aqui é um componente que aparece
            diretamente na mesma tela, controlado pelo estado (useState).
          </Text>
          <Pressable style={styles.botaoAzul} onPress={() => setModalVisible(true)}>
            <Text style={styles.textoBotao}>Abrir modal</Text>
          </Pressable>
        </View>

        {/* ── CARD 4: ActivityIndicator ──────────────────────────────── */}
        <View style={styles.card}>
          <Text style={styles.cardTitulo}>ActivityIndicator</Text>
          <Text style={styles.cardTexto}>
            O ActivityIndicator é o spinner de carregamento nativo do React Native.{'\n\n'}
            Serve para indicar ao usuário que uma operação está em andamento
            (buscar dados de uma API, salvar informações, etc.), evitando a
            sensação de que o app travou.
          </Text>
          <Pressable style={styles.botaoVerde} onPress={simularCarregamento}>
            <Text style={styles.textoBotao}>Simular carregamento</Text>
          </Pressable>
          {carregando && (
            <View style={styles.areaLoading}>
              <ActivityIndicator size="large" color="#2563eb" />
              <Text style={styles.textoLoading}>Carregando informações...</Text>
            </View>
          )}
        </View>

        {/* ── CARD 5: Boas práticas ──────────────────────────────────── */}
        <View style={styles.card}>
          <Text style={styles.cardTitulo}>Boas práticas</Text>
          <Text style={styles.cardTexto}>
            Evite colocar componentes visuais de forma inadequada, como Image dentro de Text. Prefira usar View para estruturar melhor o layout.
          </Text>
        </View>

        {/* ── SEPARADOR DE SEÇÃO ─────────────────────────────────────── */}
        {/* Divide visualmente os exemplos de componentes UI dos exemplos de persistência */}
        <View style={styles.separador}>
          <View style={styles.separadorLinha} />
          <Text style={styles.separadorTexto}>Persistência de dados</Text>
          <View style={styles.separadorLinha} />
        </View>

        {/* ── CARD 6: Serialização na prática ────────────────────────── */}
        <View style={styles.card}>
          <Text style={styles.cardTitulo}>Serialização na prática</Text>
          <Text style={styles.cardTexto}>
            Veja como um objeto Produto é transformado em texto JSON
            (serialização) e depois recuperado de volta (de-serialização).{'\n\n'}
            Isso é exatamente o que acontece por baixo dos panos quando
            o GestorDados salva ou lê um produto do AsyncStorage.
          </Text>

          {/* Mostra o código de exemplo antes de rodar */}
          <View style={styles.blocoCode}>
            <Text style={styles.textoCode}>
              {'const prod1 = new Produto(1, "Teclado", 50)\n'}
              {'const prod1Str = JSON.stringify(prod1)\n'}
              {'const prod2 = JSON.parse(prod1Str)'}
            </Text>
          </View>

          {/* Botões lado a lado */}
          <View style={styles.filaBotoes}>
            <Pressable style={[styles.botaoAzul, styles.botaoFlex]} onPress={demonstrarSerializacao}>
              <Text style={styles.textoBotao}>Executar</Text>
            </Pressable>
            <Pressable style={[styles.botaoCinza, styles.botaoFlex]} onPress={limparSerializacao}>
              <Text style={styles.textoBotaoCinza}>Limpar</Text>
            </Pressable>
          </View>

          {/* Resultado do JSON.stringify — só aparece após pressionar Executar */}
          {jsonStringificado !== null && (
            <View style={styles.resultadoBox}>
              <Text style={styles.resultadoLabel}>JSON.stringify(prod1) →</Text>
              {/* Exibe o texto JSON puro gerado pelo stringify */}
              <Text style={styles.resultadoValor}>{jsonStringificado}</Text>

              <Text style={[styles.resultadoLabel, { marginTop: 12 }]}>
                JSON.parse(prod1Str) →
              </Text>
              {/* Exibe os campos do objeto recuperado pelo parse */}
              {objetoRecuperado && (
                <View style={styles.resultadoCampos}>
                  <Text style={styles.resultadoCampo}>codigo: {objetoRecuperado.codigo}</Text>
                  <Text style={styles.resultadoCampo}>nome: "{objetoRecuperado.nome}"</Text>
                  <Text style={styles.resultadoCampo}>quantidade: {objetoRecuperado.quantidade}</Text>
                </View>
              )}
            </View>
          )}
        </View>

        {/* ── CARD 7: AsyncStorage direto ────────────────────────────── */}
        <View style={styles.card}>
          <Text style={styles.cardTitulo}>AsyncStorage direto</Text>
          <Text style={styles.cardTexto}>
            Demonstração dos métodos setItem e getItem com um exemplo simples
            de salvar e recuperar um "tema" — igual ao exemplo do material.{'\n\n'}
            Feche e reabra o app: o valor salvo permanece!
          </Text>

          {/* Campo de texto para digitar o tema */}
          <TextInput
            style={styles.input}
            placeholder="Digite um tema (ex: escuro, claro)"
            placeholderTextColor="#9ca3af"
            value={valorTema}
            onChangeText={setValorTema}
          />

          {/* Botões de salvar e recuperar lado a lado */}
          <View style={styles.filaBotoes}>
            {/* Chama AsyncStorage.setItem('tema', valorTema) */}
            <Pressable style={[styles.botaoVerde, styles.botaoFlex]} onPress={salvarTema}>
              <Text style={styles.textoBotao}>Salvar tema</Text>
            </Pressable>

            {/* Chama AsyncStorage.getItem('tema') e exibe o resultado */}
            <Pressable style={[styles.botaoAzul, styles.botaoFlex]} onPress={recuperarTema}>
              <Text style={styles.textoBotao}>Recuperar</Text>
            </Pressable>
          </View>

          {/* Resultado do getItem — só aparece após pressionar Recuperar */}
          {temaRecuperado !== null && (
            <View style={styles.resultadoBox}>
              <Text style={styles.resultadoLabel}>AsyncStorage.getItem('tema') →</Text>
              <Text style={styles.resultadoValor}>
                {temaRecuperado === '' ? '(vazio)' : `"${temaRecuperado}"`}
              </Text>
            </View>
          )}
        </View>

      </ScrollView>

      {/* ── MODAL ────────────────────────────────────────────────────── */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitulo}>Exemplo de Modal</Text>
            <Text style={styles.modalTexto}>
              Esse modal demonstra como exibir conteúdo sobre a tela atual sem trocar de rota.
            </Text>
            <Pressable style={styles.botaoFechar} onPress={() => setModalVisible(false)}>
              <Text style={styles.textoBotao}>Fechar modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

// Estilos da tela
const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: '#fff4e6',
  },

  container: {
    flex: 1,
    backgroundColor: '#fff4e6',
  },

  conteudo: {
    padding: 20,
    paddingBottom: 36,
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#7c2d12',
    marginBottom: 10,
  },

  subtitulo: {
    fontSize: 16,
    color: '#6b7280',
    lineHeight: 24,
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },

  cardTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },

  cardTexto: {
    fontSize: 15,
    color: '#4b5563',
    lineHeight: 22,
    marginBottom: 14,
  },

  exemploLinha: {
    flexDirection: 'row',
    gap: 12,
  },

  caixaAzul: {
    flex: 1,
    backgroundColor: '#2563eb',
    borderRadius: 12,
    padding: 16,
  },

  caixaClara: {
    flex: 1,
    backgroundColor: '#dbeafe',
    borderRadius: 12,
    padding: 16,
  },

  textoCaixa: {
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  textoCaixaEscuro: {
    color: '#1d4ed8',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  botaoAzul: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    borderRadius: 12,
  },

  botaoVerde: {
    backgroundColor: '#059669',
    paddingVertical: 14,
    borderRadius: 12,
  },

  // Botão cinza — usado para ações secundárias como "Limpar"
  botaoCinza: {
    backgroundColor: '#f3f4f6',
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },

  textoBotao: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },

  // Texto do botão cinza (escuro para contrastar com o fundo claro)
  textoBotaoCinza: {
    color: '#374151',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },

  // Faz o botão ocupar metade do espaço disponível (usado em filaBotoes)
  botaoFlex: {
    flex: 1,
  },

  // Linha com dois botões lado a lado
  filaBotoes: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 0,
  },

  areaLoading: {
    marginTop: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textoLoading: {
    marginTop: 10,
    fontSize: 14,
    color: '#374151',
  },

  // Bloco de código — fundo escuro estilo terminal
  blocoCode: {
    backgroundColor: '#1e293b',
    borderRadius: 10,
    padding: 14,
    marginBottom: 14,
  },

  // Texto dentro do bloco de código (estilo monospace)
  textoCode: {
    color: '#7dd3fc',   // azul claro — estilo highlight de código
    fontSize: 13,
    lineHeight: 22,
    fontFamily: 'monospace',
  },

  // Caixa que exibe o resultado da operação
  resultadoBox: {
    backgroundColor: '#f0fdf4', // verde bem claro
    borderRadius: 10,
    padding: 14,
    marginTop: 14,
    borderWidth: 1,
    borderColor: '#bbf7d0',     // borda verde
  },

  // Rótulo acima do valor (ex: "JSON.stringify(prod1) →")
  resultadoLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#166534',           // verde escuro
    marginBottom: 6,
    fontFamily: 'monospace',
  },

  // O valor resultante em si
  resultadoValor: {
    fontSize: 13,
    color: '#15803d',
    fontFamily: 'monospace',
    lineHeight: 20,
  },

  // Container dos campos do objeto de-serializado
  resultadoCampos: {
    marginTop: 4,
  },

  // Cada linha de campo do objeto (codigo, nome, quantidade)
  resultadoCampo: {
    fontSize: 13,
    color: '#15803d',
    fontFamily: 'monospace',
    lineHeight: 22,
  },

  // Campo de texto para o exemplo de AsyncStorage
  input: {
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    color: '#1a1a1a',
    marginBottom: 12,
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },

  modalBox: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 22,
  },

  modalTitulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e3a5f',
    marginBottom: 12,
  },

  modalTexto: {
    fontSize: 15,
    color: '#4b5563',
    lineHeight: 22,
    marginBottom: 18,
  },

  botaoFechar: {
    backgroundColor: '#ef4444',
    paddingVertical: 14,
    borderRadius: 12,
  },

  // Separador visual entre seções da tela
  separador: {
    flexDirection: 'row',   // linha + texto + linha lado a lado
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 4,
  },

  // Linha horizontal dos lados do texto
  separadorLinha: {
    flex: 1,
    height: 1,
    backgroundColor: '#d1d5db',
  },

  // Texto central do separador
  separadorTexto: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6b7280',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginHorizontal: 12,
  },
});
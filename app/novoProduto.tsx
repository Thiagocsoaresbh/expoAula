// ─────────────────────────────────────────────────────────────────────────────
// FLUXO DE CONSTRUÇÃO — Formulário de Cadastro: novoProduto.tsx
// Tela para cadastrar um novo produto com código, nome e quantidade.
// Construa este arquivo APÓS produtos.tsx.
// ─────────────────────────────────────────────────────────────────────────────

// ── PASSO 1 — Imports ────────────────────────────────────────────────────────

// 1.1 useState → cria variáveis reativas para cada campo do formulário
import { useState } from 'react';

// 1.2 Componentes do React Native usados no formulário:
//     Alert      → exibe caixas de diálogo nativas do celular (avisos e erros)
//     Pressable  → botão customizável
//     StyleSheet → organiza os estilos
//     Text       → exibe textos e rótulos
//     TextInput  → campo de entrada de texto (equivalente ao <input> do HTML)
//     View       → container de layout
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

// 1.3 useRouter → para voltar à tela anterior após salvar
import { useRouter } from 'expo-router';

// 1.4 Importa o modelo e o gestor de dados
//     → dados/Produto.ts e dados/GestorDados.ts (Fase 2)
import { Produto } from '../dados/Produto';
import { GestorDados } from '../dados/GestorDados';

// ── PASSO 2 — Componente da tela ─────────────────────────────────────────────

// 2.1 Cria e exporta a tela de cadastro
export default function NovoProdutoScreen() {

  // 2.2 Hook de navegação — usado para voltar após salvar
  const router = useRouter();

  // ── PASSO 3 — Estados dos campos ───────────────────────────────────────────

  // 3.1 Cada campo do formulário tem seu próprio estado
  //     O estado começa vazio ('') e é atualizado conforme o usuário digita

  // 3.2 Estado do campo Código — guardamos como string pois o TextInput retorna texto
  //     Depois convertemos para number ao criar o objeto Produto
  const [codigo, setCodigo] = useState('');

  // 3.3 Estado do campo Nome
  const [nome, setNome] = useState('');

  // 3.4 Estado do campo Quantidade
  const [quantidade, setQuantidade] = useState('');

  // ── PASSO 4 — Função de salvar ──────────────────────────────────────────────

  // 4.1 Executa ao pressionar o botão "Salvar"
  async function salvar() {

    // 4.2 Validação básica — verifica se todos os campos foram preenchidos
    //     .trim() remove espaços em branco das bordas do texto
    if (!codigo.trim() || !nome.trim() || !quantidade.trim()) {
      Alert.alert('Atenção', 'Preencha todos os campos antes de salvar.');
      return; // interrompe a função se algum campo estiver vazio
    }

    // 4.3 Cria um novo objeto Produto com os dados digitados
    //     Number() converte o texto do campo para número
    //     → Classe definida em dados/Produto.ts (Passo 2 do Produto.ts)
    const novoProduto = new Produto(
      Number(codigo),
      nome.trim(),
      Number(quantidade)
    );

    // 4.4 Salva o produto no AsyncStorage via GestorDados
    //     "await" espera a operação assíncrona terminar antes de continuar
    //     → GestorDados.adicionar definido em dados/GestorDados.ts (Passo 4)
    await GestorDados.adicionar(novoProduto);

    // 4.5 Volta para a tela anterior (listagem de produtos)
    //     router.back() desfaz a navegação, voltando uma tela na pilha
    router.back();
  }

  // ── PASSO 5 — Interface visual ──────────────────────────────────────────────

  return (

    // 5.1 Container principal da tela
    <View style={styles.container}>

      <Text style={styles.titulo}>Novo Produto</Text>

      {/* 5.2 Campo de Código
               keyboardType="numeric" → abre teclado numérico no celular
               value → valor atual do estado
               onChangeText → função chamada a cada tecla digitada, recebe o novo texto */}
      <TextInput
        style={styles.campo}
        placeholder="Código"
        placeholderTextColor="#9ca3af"
        keyboardType="numeric"
        value={codigo}
        onChangeText={setCodigo}
      />

      {/* 5.3 Campo de Nome — teclado padrão (texto) */}
      <TextInput
        style={styles.campo}
        placeholder="Nome"
        placeholderTextColor="#9ca3af"
        value={nome}
        onChangeText={setNome}
      />

      {/* 5.4 Campo de Quantidade — teclado numérico */}
      <TextInput
        style={styles.campo}
        placeholder="Quantidade"
        placeholderTextColor="#9ca3af"
        keyboardType="numeric"
        value={quantidade}
        onChangeText={setQuantidade}
      />

      {/* 5.5 Botão Salvar — chama a função salvar() ao ser pressionado */}
      <Pressable style={styles.botaoSalvar} onPress={salvar}>
        <Text style={styles.textoBotao}>Salvar</Text>
      </Pressable>

    </View>
  );
}

// ── PASSO 6 — Estilos ────────────────────────────────────────────────────────

const styles = StyleSheet.create({

  // 6.1 Container principal centralizado
  container: {
    flex: 1,
    backgroundColor: '#f4f6fb',
    padding: 24,
    paddingTop: 32,
  },

  // 6.2 Título da tela
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e3a5f',
    marginBottom: 28,
  },

  // 6.3 Estilo dos campos de texto
  campo: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 10,
    padding: 14,
    fontSize: 15,
    color: '#1a1a1a',
    marginBottom: 16, // espaço entre os campos
  },

  // 6.4 Botão Salvar (azul, largura total)
  botaoSalvar: {
    backgroundColor: '#2563eb',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },

  // 6.5 Texto do botão
  textoBotao: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },

});
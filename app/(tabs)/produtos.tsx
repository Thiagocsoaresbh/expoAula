// ─────────────────────────────────────────────────────────────────────────────
// FLUXO DE CONSTRUÇÃO — Tela de Listagem: produtos.tsx
// Exibe todos os produtos salvos e permite excluir e navegar para o cadastro.
// Construa este arquivo APÓS ProdutoItem.tsx e GestorDados.ts.
// ─────────────────────────────────────────────────────────────────────────────

// ── PASSO 1 — Imports ────────────────────────────────────────────────────────

// 1.1 useCallback → memoiza uma função para evitar recriação desnecessária
//     useState    → cria variáveis reativas (quando mudam, a tela re-renderiza)
import { useCallback, useState } from 'react';

// 1.2 FlatList  → renderiza listas de forma eficiente (só o que está visível)
//     Pressable  → botão customizável
//     StyleSheet → organiza os estilos
//     Text       → exibe textos
//     View       → container de layout
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

// 1.3 useFocusEffect → hook que executa uma função toda vez que a tela ganha foco
//     useRouter      → permite navegar entre telas via código
//     Ambos vêm do Expo Router
import { useFocusEffect, useRouter } from 'expo-router';

// 1.4 Importa o modelo e o gestor de dados que criamos
//     → dados/Produto.ts e dados/GestorDados.ts (Fase 2)
import { Produto } from '../../dados/Produto';
import { GestorDados } from '../../dados/GestorDados';

// 1.5 Importa o componente de item da lista
//     → Construído em components/ProdutoItem.tsx (Passo 3 do fluxo anterior)
import { ProdutoItem } from '../../components/ProdutoItem';

// ── PASSO 2 — Componente da tela ─────────────────────────────────────────────

// 2.1 Cria e exporta a tela de listagem de produtos
export default function ProdutosScreen() {

  // 2.2 Hook de navegação
  const router = useRouter();

  // 2.3 Estado que armazena a lista de produtos exibida na FlatList
  //     Produto[] → array de objetos do tipo Produto
  //     Começa vazio e é preenchido ao carregar os dados do armazenamento
  const [produtos, setProdutos] = useState<Produto[]>([]);

  // ── PASSO 3 — Carregamento com foco ────────────────────────────────────────

  // 3.1 useFocusEffect executa o callback TODA VEZ que a tela ganha foco
  //     Isso garante que a lista seja atualizada quando o usuário:
  //     → Abre o app na aba Produtos
  //     → Volta da tela de cadastro (novoProduto.tsx) após salvar
  useFocusEffect(

    // 3.2 useCallback memoiza a função para evitar loops infinitos de re-execução
    //     O array vazio [] significa: "cria essa função uma única vez"
    useCallback(() => {
      carregarProdutos();
    }, [])
  );

  // ── PASSO 4 — Funções ───────────────────────────────────────────────────────

  // 4.1 Busca todos os produtos salvos no AsyncStorage e atualiza o estado
  //     "async" → função assíncrona (não trava a interface enquanto busca)
  async function carregarProdutos() {
    const lista = await GestorDados.obterTodos();
    setProdutos(lista); // 4.2 atualiza o estado → a FlatList re-renderiza automaticamente
  }

  // 4.3 Exclui um produto pelo código e recarrega a lista
  async function excluirProduto(codigo: number) {
    await GestorDados.remover(codigo); // remove do armazenamento
    await carregarProdutos();          // recarrega a lista atualizada
  }

  // ── PASSO 5 — Interface visual ──────────────────────────────────────────────

  return (

    // 5.1 Container principal da tela
    <View style={styles.container}>

      {/* 5.2 Cabeçalho com título e botão de novo produto */}
      <View style={styles.cabecalho}>
        <Text style={styles.titulo}>Listagem de Produtos</Text>

        {/* 5.3 Botão que navega para a tela de cadastro
                 router.push('/novoProduto') abre o arquivo app/novoProduto.tsx */}
        <Pressable style={styles.botaoNovo} onPress={() => router.push('/novoProduto')}>
          <Text style={styles.textoBotaoNovo}>Novo Produto</Text>
        </Pressable>
      </View>

      {/* 5.4 FlatList que renderiza a lista de produtos
               data          → o array de produtos do estado
               keyExtractor  → chave única por item (usa o código convertido em string)
               renderItem    → como cada item será exibido
               ListEmptyComponent → o que mostrar quando a lista estiver vazia */}
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.codigo.toString()}

        // 5.5 renderItem recebe cada produto e retorna o componente visual
        //     onDelete passa uma função que chama excluirProduto com o código do item
        renderItem={({ item }) => (
          <ProdutoItem
            produto={item}
            onDelete={() => excluirProduto(item.codigo)}
          />
        )}

        // 5.6 Exibido quando não há produtos cadastrados ainda
        ListEmptyComponent={
          <Text style={styles.listaVazia}>
            Nenhum produto cadastrado ainda.{'\n'}Toque em "Novo Produto" para começar.
          </Text>
        }

        contentContainerStyle={styles.lista}
      />

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

  // 6.2 Cabeçalho com título e botão
  cabecalho: {
    marginBottom: 16,
  },

  // 6.3 Título da tela
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e3a5f',
    marginBottom: 12,
  },

  // 6.4 Botão "Novo Produto" (azul, largura total)
  botaoNovo: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },

  // 6.5 Texto do botão
  textoBotaoNovo: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },

  // 6.6 Espaçamento interno da lista
  lista: {
    paddingBottom: 24,
  },

  // 6.7 Mensagem quando a lista está vazia
  listaVazia: {
    textAlign: 'center',
    color: '#9ca3af',
    fontSize: 15,
    lineHeight: 24,
    marginTop: 48,
  },

});
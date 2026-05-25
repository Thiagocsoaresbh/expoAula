// ─────────────────────────────────────────────────────────────────────────────
// FLUXO DE CONSTRUÇÃO — Camada de persistência: GestorDados.ts
// Este arquivo gerencia o salvamento e a leitura de produtos no celular.
// Construa este arquivo APÓS o Produto.ts e ANTES das telas.
// ─────────────────────────────────────────────────────────────────────────────

// ── PASSO 1 — Imports ────────────────────────────────────────────────────────

// 1.1 AsyncStorage → biblioteca de armazenamento local do React Native
//     Funciona com pares chave-valor, de forma assíncrona (não trava a tela)
//     Instalação: npx expo install @react-native-async-storage/async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// 1.2 Importa a classe Produto que definimos no arquivo anterior
//     → Construída em dados/Produto.ts (Passo 2)
import { Produto } from './Produto';

// ── PASSO 2 — Chave de armazenamento ─────────────────────────────────────────

// 2.1 Prefixo usado para identificar cada produto no AsyncStorage
//     Cada produto será salvo com uma chave única: ex "@produto_1", "@produto_2"
//     O prefixo evita conflito com outros dados que o app possa armazenar
const PREFIXO_CHAVE = '@produto_';

// 2.2 Função auxiliar que monta a chave completa a partir do código do produto
//     Exemplo: montarChave(1) → "@produto_1"
function montarChave(codigo: number): string {
  return `${PREFIXO_CHAVE}${codigo}`;
}

// ── PASSO 3 — Funções de persistência ────────────────────────────────────────

// 3.1 Salva um produto no armazenamento local
//     "async" → indica que a função é assíncrona (retorna uma Promise)
//     Parâmetros: o objeto Produto que queremos guardar
async function salvarProduto(produto: Produto): Promise<void> {

  // 3.2 Serializa o objeto para texto JSON antes de salvar
  //     JSON.stringify transforma: { codigo: 1, nome: 'Banana', quantidade: 1000 }
  //     em texto: '{"codigo":1,"nome":"Banana","quantidade":1000}'
  const produtoJSON = JSON.stringify(produto);

  // 3.3 Salva no AsyncStorage usando a chave gerada a partir do código
  //     "await" → espera a operação assíncrona terminar antes de continuar
  //     setItem(chave, valor) → armazena o par chave-valor no disco
  await AsyncStorage.setItem(montarChave(produto.codigo), produtoJSON);
}

// 3.4 Remove um produto do armazenamento a partir do seu código
async function removerProduto(codigo: number): Promise<void> {

  // 3.5 removeItem(chave) → exclui o item com aquela chave do armazenamento
  await AsyncStorage.removeItem(montarChave(codigo));
}

// 3.6 Recupera todos os produtos salvos no armazenamento
async function obterProdutos(): Promise<Produto[]> {

  // 3.7 getAllKeys() → retorna todas as chaves salvas no AsyncStorage
  //     Como pode retornar null, usamos "|| []" para garantir um array vazio
  const todasChaves = await AsyncStorage.getAllKeys();

  // 3.8 Filtra apenas as chaves que pertencem a produtos (começam com o prefixo)
  //     Isso evita pegar dados de outras partes do app
  const chavesProdutos = todasChaves.filter(chave =>
    chave.startsWith(PREFIXO_CHAVE)
  );

  // 3.9 Se não houver nenhum produto salvo, retorna array vazio imediatamente
  if (chavesProdutos.length === 0) return [];

  // 3.10 multiGet(chaves[]) → busca vários itens de uma vez (mais eficiente)
  //      Retorna um array de pares: [['chave', 'valorJSON'], ...]
  const pares = await AsyncStorage.multiGet(chavesProdutos);

  // 3.11 Transforma cada par [chave, valorJSON] em um objeto Produto
  //      .map() percorre cada par e de-serializa o JSON de volta para objeto
  //      .filter() remove qualquer item que tenha vindo vazio (null)
  const produtos = pares
    .map(([_, valorJSON]) => {
      if (!valorJSON) return null;

      // 3.12 JSON.parse → transforma o texto JSON de volta em objeto JavaScript
      //      "as Produto" → informa ao TypeScript que o resultado é um Produto
      return JSON.parse(valorJSON) as Produto;
    })
    .filter((produto): produto is Produto => produto !== null);

  // 3.13 Ordena os produtos por código antes de retornar (mais organizado na lista)
  return produtos.sort((a, b) => a.codigo - b.codigo);
}

// ── PASSO 4 — Classe GestorDados ─────────────────────────────────────────────

// 4.1 Agrupa todas as operações em uma classe para facilitar o uso nas telas
//     As telas só precisam chamar: GestorDados.adicionar(produto)
//     sem precisar saber os detalhes internos de como o salvamento funciona
export class GestorDados {

  // 4.2 Adiciona um novo produto ao armazenamento
  //     "static" → o método pode ser chamado sem criar uma instância da classe
  //     Exemplo de uso: await GestorDados.adicionar(meuProduto)
  static async adicionar(produto: Produto): Promise<void> {
    await salvarProduto(produto);
  }

  // 4.3 Remove um produto pelo código
  //     Exemplo de uso: await GestorDados.remover(1)
  static async remover(codigo: number): Promise<void> {
    await removerProduto(codigo);
  }

  // 4.4 Retorna todos os produtos salvos
  //     Promise<Produto[]> → retorna de forma assíncrona um array de produtos
  //     Exemplo de uso: const lista = await GestorDados.obterTodos()
  static async obterTodos(): Promise<Produto[]> {
    return await obterProdutos();
  }
}

// ── PASSO 5 — Como as telas vão usar este gestor ─────────────────────────────

// 5.1 Na tela de listagem (produtos.tsx):
//     const lista = await GestorDados.obterTodos()
//     → Busca todos os produtos e exibe na FlatList

// 5.2 No formulário (novoProduto.tsx), ao clicar em Salvar:
//     const p = new Produto(codigo, nome, quantidade)
//     await GestorDados.adicionar(p)
//     → Cria o objeto e salva no armazenamento

// 5.3 Na listagem, ao clicar em excluir:
//     await GestorDados.remover(produto.codigo)
//     → Remove o produto e atualiza a lista
//
// → Próximo passo: criar components/ProdutoItem.tsx e app/(tabs)/produtos.tsx
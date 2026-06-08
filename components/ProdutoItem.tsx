// ─────────────────────────────────────────────────────────────────────────────
// FLUXO DE CONSTRUÇÃO — Componente ProdutoItem.tsx
// Representa um único item da lista de produtos.
// Construa este arquivo ANTES da tela produtos.tsx.
// ─────────────────────────────────────────────────────────────────────────────

// ── PASSO 1 — Imports ────────────────────────────────────────────────────────

// 1.1 Componentes visuais do React Native
//     Pressable → área de toque para o botão de excluir
//     StyleSheet → estilos organizados
//     Text → exibe textos (nome, quantidade)
//     View → container que estrutura o layout do item
import { Pressable, StyleSheet, Text, View } from 'react-native';

// 1.2 Importa a classe Produto para tipar a prop corretamente
//     → Construída em dados/Produto.ts
import { Produto } from '../dados/Produto';

// ── PASSO 2 — Tipo das propriedades ──────────────────────────────────────────

// 2.1 Define quais dados o componente recebe de fora
type ProdutoItemProps = {
  produto: Produto;        // 2.2 o objeto completo do produto a ser exibido
  onDelete: () => void;   // 2.3 função chamada ao pressionar o botão de excluir
                           //     "()" significa que não recebe parâmetros
                           //     "void" significa que não retorna nada
};

// ── PASSO 3 — Componente ─────────────────────────────────────────────────────

// 3.1 Cria o componente ProdutoItem
//     Recebe "produto" (os dados) e "onDelete" (o que fazer ao excluir)
//     → Este componente é usado em produtos.tsx no Passo 5 (renderItem da FlatList)
export function ProdutoItem({ produto, onDelete }: ProdutoItemProps) {
  return (

    // 3.2 View principal — linha do item na lista
    <View style={styles.item}>

      {/* 3.3 Área de texto com as informações do produto */}
      <View style={styles.info}>

        {/* 3.4 Exibe código e nome na mesma linha
                 As chaves { } permitem usar variáveis dentro do JSX
                 O template string `${...}` concatena os valores */}
        <Text style={styles.nome}>
          {produto.codigo} - {produto.nome}
        </Text>

        {/* 3.5 Exibe a quantidade do produto */}
        <Text style={styles.quantidade}>
          Quantidade: {produto.quantidade}
        </Text>

      </View>

      {/* 3.6 Botão de excluir — chama a função onDelete ao ser pressionado
               A função vem de fora (props), a decisão de O QUE fazer é da tela pai
               Isso mantém o componente reutilizável e independente */}
      <Pressable style={styles.botaoExcluir} onPress={onDelete}>
        <Text style={styles.textoExcluir}>X</Text>
      </Pressable>

    </View>
  );
}

// ── PASSO 4 — Estilos ────────────────────────────────────────────────────────

const styles = StyleSheet.create({

  // 4.1 Container do item — linha horizontal com separador embaixo
  item: {
    flexDirection: 'row',        // nome/qtd à esquerda, botão à direita
    alignItems: 'center',        // alinha verticalmente no centro
    justifyContent: 'space-between', // empurra os elementos para as extremidades
    paddingVertical: 14,         // espaço interno vertical
    paddingHorizontal: 4,        // espaço interno lateral
    borderBottomWidth: 1,        // linha separadora entre os itens
    borderBottomColor: '#e5e7eb',
  },

  // 4.2 Área de informações (lado esquerdo)
  info: {
    flex: 1,        // ocupa todo o espaço disponível, deixando lugar para o botão
    paddingRight: 12,
  },

  // 4.3 Texto do nome do produto
  nome: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },

  // 4.4 Texto da quantidade
  quantidade: {
    fontSize: 13,
    color: '#6b7280', // cinza
  },

  // 4.5 Botão de excluir (quadrado vermelho)
  botaoExcluir: {
    backgroundColor: '#ef4444', // vermelho
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // 4.6 Texto "X" dentro do botão
  textoExcluir: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },

});
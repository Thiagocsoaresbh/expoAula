// ─────────────────────────────────────────────────────────────────────────────
// FLUXO DE CONSTRUÇÃO — Componente BlocoAula
// Este componente é criado durante a construção da tela Home (index.tsx).
// Construa este arquivo quando chegar no Passo 3 do index.tsx.
// Depois de pronto, volte para o Passo 4 do index.tsx para usá-lo.
// ─────────────────────────────────────────────────────────────────────────────

// ── PASSO 1 — Imports ────────────────────────────────────────────────────────

// 1.1 Pressable → adicionado para suportar o botão opcional do bloco
//     StyleSheet → para criar e organizar os estilos do componente
//     Text       → para exibir o título, a descrição e o texto do botão
//     View       → container que agrupa e estrutura os elementos do card
import { Pressable, StyleSheet, Text, View } from 'react-native';

// ── PASSO 2 — Tipo das propriedades (TypeScript) ──────────────────────────────

// 2.1 Define quais props o componente aceita e qual o tipo de cada uma
type BlocoAulaProps = {
  titulo: string;    // 2.2 título do bloco — obrigatório
  descricao: string; // 2.3 descrição do bloco — obrigatório

  // 2.4 Props opcionais — marcadas com "?" (podem ou não ser passadas)
  //     Quando passadas juntas, exibem um botão de ação no rodapé do card
  //     Isso é um bom exemplo de como tornar um componente mais flexível
  //     sem quebrar os usos anteriores (que não passam essas props)
  textoBotao?: string;       // texto exibido no botão (ex: "Ver na prática →")
  onBotaoPress?: () => void; // função chamada ao pressionar o botão
};

// ── PASSO 3 — Componente ─────────────────────────────────────────────────────

// 3.1 Cria o componente BlocoAula
//     Recebe as props via desestruturação — as opcionais vêm com valor padrão undefined
//     → Este componente é usado em index.tsx no Passo 4
export function BlocoAula({ titulo, descricao, textoBotao, onBotaoPress }: BlocoAulaProps) {
  return (

    // 3.2 View é o container do card — agrupa todos os elementos
    <View style={styles.card}>

      {/* 3.3 Título recebido via prop */}
      <Text style={styles.titulo}>{titulo}</Text>

      {/* 3.4 Descrição recebida via prop */}
      <Text style={styles.descricao}>{descricao}</Text>

      {/* 3.5 Botão opcional — só renderiza SE textoBotao E onBotaoPress foram passados
               O operador && significa: "se a condição for verdadeira, renderiza o que vem depois"
               Isso evita que o botão apareça nos blocos que não precisam dele */}
      {textoBotao && onBotaoPress && (
        <Pressable style={styles.botao} onPress={onBotaoPress}>
          <Text style={styles.textoBotao}>{textoBotao}</Text>
        </Pressable>
      )}

    </View>
  );
}

// ── PASSO 4 — Estilos ────────────────────────────────────────────────────────

const styles = StyleSheet.create({

  // 4.1 Estilo do card (container principal)
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#dbe4f0',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },

  // 4.2 Estilo do título
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e3a5f',
    marginBottom: 8,
  },

  // 4.3 Estilo da descrição
  descricao: {
    fontSize: 15,
    color: '#4b5563',
    lineHeight: 23,
  },

  // 4.4 Estilo do botão opcional — aparece separado da descrição
  botao: {
    marginTop: 14,
    backgroundColor: '#eaf2ff',  // azul bem claro — tom suave, não compete com o conteúdo
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    alignSelf: 'flex-start',     // ocupa só o espaço do texto, não a largura toda
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },

  // 4.5 Texto do botão
  textoBotao: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1d4ed8',            // azul médio
  },

});
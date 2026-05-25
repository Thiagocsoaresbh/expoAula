// ─────────────────────────────────────────────────────────────────────────────
// FLUXO DE CONSTRUÇÃO — Componente BlocoAula
// Este componente é criado durante a construção da tela Home (index.tsx).
// Construa este arquivo quando chegar no Passo 3 do index.tsx.
// Depois de pronto, volte para o Passo 4 do index.tsx para usá-lo.
// ─────────────────────────────────────────────────────────────────────────────

// ── PASSO 1 — Imports ────────────────────────────────────────────────────────

// 1.1 Importa os componentes necessários do React Native
//     StyleSheet → para criar e organizar os estilos do componente
//     Text       → para exibir o título e a descrição
//     View       → container que agrupa e estrutura os elementos do card
import { StyleSheet, Text, View } from 'react-native';

// ── PASSO 2 — Tipo das propriedades (TypeScript) ──────────────────────────────

// 2.1 Define quais props o componente aceita e qual o tipo de cada uma
//     Isso é TypeScript: garante que quem usar BlocoAula passe os dados corretos
//     Se faltar uma prop ou o tipo estiver errado, o editor já avisa antes de rodar
type BlocoAulaProps = {
  titulo: string;    // 2.2 título do bloco — deve ser sempre um texto
  descricao: string; // 2.3 descrição do bloco — deve ser sempre um texto
};

// ── PASSO 3 — Componente ─────────────────────────────────────────────────────

// 3.1 Cria o componente BlocoAula
//     Recebe as props via desestruturação: { titulo, descricao }
//     "export" permite que outros arquivos importem e usem esse componente
//     → Este componente é usado em index.tsx no Passo 4
export function BlocoAula({ titulo, descricao }: BlocoAulaProps) {
  return (

    // 3.2 View é o container do card — agrupa título e descrição
    <View style={styles.card}>

      {/* 3.3 Exibe o título recebido via prop
               As chaves { } permitem usar variáveis dentro do JSX */}
      <Text style={styles.titulo}>{titulo}</Text>

      {/* 3.4 Exibe a descrição recebida via prop */}
      <Text style={styles.descricao}>{descricao}</Text>

    </View>
  );
}

// ── PASSO 4 — Estilos ────────────────────────────────────────────────────────

const styles = StyleSheet.create({

  // 4.1 Estilo do card (container principal)
  card: {
    backgroundColor: '#ffffff', // fundo branco
    borderRadius: 16,           // bordas arredondadas
    padding: 18,                // espaçamento interno
    marginBottom: 14,           // espaço abaixo de cada bloco (separa os cards)
    borderWidth: 1,             // espessura da borda
    borderColor: '#dbe4f0',     // cor da borda (azul bem claro)
    // Sombra para iOS
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    // Sombra para Android
    elevation: 2,
  },

  // 4.2 Estilo do título
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e3a5f',  // azul escuro
    marginBottom: 8,   // espaço entre o título e a descrição
  },

  // 4.3 Estilo da descrição
  descricao: {
    fontSize: 15,
    color: '#4b5563', // cinza médio
    lineHeight: 23,   // altura da linha — aumentar melhora a legibilidade de textos longos
  },

});
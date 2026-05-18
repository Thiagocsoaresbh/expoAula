// ─────────────────────────────────────────────────────────────────────────────
// FLUXO DE CONSTRUÇÃO — Componente Cartao
// Este componente é construído em paralelo com a tela usuarios.tsx.
// Construa este arquivo primeiro, depois volte para o Passo 3 em usuarios.tsx.
// ─────────────────────────────────────────────────────────────────────────────

// ── PASSO 1 — Imports ────────────────────────────────────────────────────────

// 1.1 Importa os componentes necessários do React Native
//     StyleSheet → para criar os estilos do componente
//     Text       → para exibir textos (nome, cargo, departamento, status)
//     View       → container que estrutura o layout do card
import { StyleSheet, Text, View } from 'react-native';

// ── PASSO 2 — Tipo das propriedades (TypeScript) ──────────────────────────────

// 2.1 Define o "contrato" de dados que o componente aceita
//     Isso é TypeScript: garante que quem usar o Cartao passe os dados certos
//     Se faltar uma prop ou o tipo estiver errado, o editor já avisa antes de rodar
type CartaoProps = {
  nome: string;          // 2.2 nome da pessoa — deve ser sempre um texto
  cargo: string;         // 2.3 cargo da pessoa — deve ser sempre um texto
  departamento: string;  // 2.4 departamento — deve ser sempre um texto
  ativo: boolean;        // 2.5 status — deve ser true (ativo) ou false (inativo)
};

// ── PASSO 3 — Componente ─────────────────────────────────────────────────────

// 3.1 Cria o componente Cartao
//     Recebe as props via desestruturação: { nome, cargo, departamento, ativo }
//     "export" permite que outros arquivos importem e usem esse componente
//     → Este componente é chamado em usuarios.tsx no Passo 3.7
export function Cartao({ nome, cargo, departamento, ativo }: CartaoProps) {
  return (

    // 3.2 View principal — o card em si (container de tudo)
    <View style={styles.cartao}>

      {/* 3.3 Linha do topo: nome à esquerda + badge de status à direita
               flexDirection: 'row' organiza os filhos lado a lado (horizontal) */}
      <View style={styles.header}>

        {/* 3.4 Exibe o nome recebido via prop */}
        <Text style={styles.nome}>{nome}</Text>

        {/* 3.5 Badge de status — muda de estilo conforme o valor de "ativo"
                 Se ativo = true  → usa estilo verde  (badgeAtivo)
                 Se ativo = false → usa estilo cinza  (badgeInativo)
                 Isso é uma expressão ternária: condição ? valorSeVerdadeiro : valorSeFalso */}
        <View style={ativo ? styles.badgeAtivo : styles.badgeInativo}>

          {/* 3.6 Texto do badge — também muda conforme o status */}
          <Text style={ativo ? styles.badgeTextoAtivo : styles.badgeTextoInativo}>
            {ativo ? 'Ativo' : 'Inativo'}
          </Text>

        </View>
      </View>

      {/* 3.7 Exibe o cargo recebido via prop */}
      <Text style={styles.cargo}>{cargo}</Text>

      {/* 3.8 Exibe o departamento recebido via prop */}
      <Text style={styles.departamento}>{departamento}</Text>

    </View>
  );
}

// ── PASSO 4 — Estilos ────────────────────────────────────────────────────────

const styles = StyleSheet.create({

  // 4.1 Estilo do card (container principal)
  cartao: {
    backgroundColor: '#fff',  // fundo branco
    borderRadius: 12,          // bordas arredondadas
    padding: 16,               // espaçamento interno
    marginBottom: 12,          // espaço abaixo de cada card (separa os itens da lista)
    borderWidth: 1,            // espessura da borda
    borderColor: '#e0e0e0',    // cor da borda (cinza claro)
  },

  // 4.2 Linha superior do card (nome + badge)
  header: {
    flexDirection: 'row',            // organiza os filhos na horizontal
    justifyContent: 'space-between', // empurra nome para a esquerda e badge para a direita
    alignItems: 'center',            // alinha verticalmente no centro
    marginBottom: 4,
  },

  // 4.3 Estilo do nome
  nome: {
    fontSize: 16,
    fontWeight: '600', // semi-negrito
    color: '#1a1a1a',
  },

  // 4.4 Estilo do cargo
  cargo: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },

  // 4.5 Estilo do departamento
  departamento: {
    fontSize: 13,
    color: '#378ADD', // azul
    marginTop: 6,
    fontWeight: '500',
  },

  // 4.6 Badge ATIVO (verde)
  badgeAtivo: {
    backgroundColor: '#E1F5EE', // fundo verde claro
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },

  // 4.7 Texto do badge ATIVO
  badgeTextoAtivo: {
    fontSize: 11,
    fontWeight: '600',
    color: '#085041', // verde escuro
  },

  // 4.8 Badge INATIVO (cinza)
  badgeInativo: {
    backgroundColor: '#F1EFE8', // fundo cinza claro
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },

  // 4.9 Texto do badge INATIVO
  badgeTextoInativo: {
    fontSize: 11,
    fontWeight: '600',
    color: '#6B6B66', // cinza escuro
  },

});
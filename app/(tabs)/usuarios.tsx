// ─────────────────────────────────────────────────────────────────────────────
// FLUXO DE CONSTRUÇÃO — Tela de Usuários
// Siga os passos em ordem. Cada número indica a sequência lógica de criação.
// Os passos marcados com (→ Cartao.tsx) indicam que há continuação no componente.
// ─────────────────────────────────────────────────────────────────────────────

// Importa o componente Cartao que criamos na pasta components
// Ele vai ser reutilizado para exibir as informações de cada usuário
import { Cartao } from '../../components/cartao';

// ── PASSO 2 — Dados ──────────────────────────────────────────────────────────

// 2.1 Array com os dados dos usuários
//     Em vez de repetir o componente <Cartao> 4 vezes com dados fixos,
//     guardamos tudo aqui em um array e deixamos o código renderizar cada um.
//     Isso segue o princípio DRY: Don't Repeat Yourself (não repita a si mesmo)
const usuarios = [

  // 2.2 Cada objeto do array tem exatamente as mesmas propriedades
  //     que o componente Cartao espera receber (veja CartaoProps em Cartao.tsx)
  { nome: 'João Silva',  cargo: 'Desenvolvedor', departamento: 'Tecnologia', ativo: true  },
  { nome: 'Maria Souza', cargo: 'Designer',      departamento: 'UX/UI',      ativo: false },
  { nome: 'Carlos Lima', cargo: 'Analista',      departamento: 'Financeiro', ativo: true  },
  { nome: 'Ana Costa',   cargo: 'Gerente',       departamento: 'RH',         ativo: false },

];

// ── PASSO 3 — Componente da tela ─────────────────────────────────────────────

// 3.1 Cria e exporta a tela de Usuários
//     O "export default" permite que o Expo Router reconheça esse arquivo como uma tela
export default function UsuariosScreen() {

  // 3.2 O return define tudo que será exibido visualmente na tela
  return (

    // 3.3 View como container principal da tela
    <View style={styles.container}>

      {/* 3.4 Título da tela */}
      <Text style={styles.titulo}>Lista de Usuários</Text>

      {/* 3.5 FlatList — renderiza a lista de usuários automaticamente a partir do array
               Principais propriedades:
               • data          → o array de dados que será percorrido
               • keyExtractor  → função que retorna uma chave única por item
                                  (evita bugs de renderização no React)
               • renderItem    → função que define COMO cada item do array será exibido
               • contentContainerStyle → estilo aplicado ao conteúdo interno da lista */}
      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.nome}
        contentContainerStyle={styles.lista}

        // 3.6 renderItem recebe cada objeto do array um por vez
        //     { item } é a desestruturação automática que a FlatList faz
        //     item representa um objeto do array, ex: { nome: 'João Silva', ... }
        renderItem={({ item }) => (

          // 3.7 Renderiza o componente Cartao passando os dados do objeto como props
          //     O spread operator "...item" expande todas as propriedades do objeto:
          //     é o mesmo que escrever: nome={item.nome} cargo={item.cargo} ...
          //     → Veja como o Cartao usa essas props em components/Cartao.tsx (Passo 3)
          <Cartao {...item} />

        )}
      />

    </View>
  );
}

// ── PASSO 4 — Estilos ────────────────────────────────────────────────────────

const styles = StyleSheet.create({

  // 4.1 Container principal da tela
  container: {
    flex: 1,                    // ocupa todo o espaço disponível na tela
    backgroundColor: '#f4f6fb', // fundo azul bem claro
    paddingTop: 16,             // espaço no topo
    paddingHorizontal: 16,      // espaço nas laterais
  },

  // 4.2 Título da tela
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e3a5f',
    marginBottom: 16,
  },

  // 4.3 Espaçamento interno da lista
  lista: {
    paddingBottom: 28, // evita que o último card fique colado na barra de navegação
  },

});
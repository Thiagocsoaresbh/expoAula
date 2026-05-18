// Importa os componentes visuais que vamos usar nessa tela
// ScrollView → permite rolar a tela quando o conteúdo é maior que a tela
// StyleSheet → usado para criar os estilos (parecido com CSS)
// Text → exibe textos na tela
// View → é um container, usado para agrupar e organizar elementos (como uma "div" no HTML)
import { ScrollView, StyleSheet, Text, View } from 'react-native';

// Importa o componente Cartao que criamos na pasta components
// Ele vai ser reutilizado para exibir as informações de cada usuário
import { Cartao } from '../../components/cartao';

// Cria e exporta a tela de Usuários como função
// O "export default" faz com que o Expo Router reconheça isso como uma tela
export default function UsuariosScreen() {

  // O return define o que vai aparecer visualmente na tela
  return (

    // ScrollView é o container com rolagem
    // style → aplica o estilo externo (fundo, largura, etc.)
    // contentContainerStyle → aplica o estilo no conteúdo interno (padding, etc.)
    <ScrollView style={styles.container} contentContainerStyle={styles.conteudo}>

      {/* Texto de título da tela */}
      <Text style={styles.titulo}>Lista de Usuários</Text>

      {/* View que agrupa todos os cartões de usuário */}
      <View style={styles.lista}>

        {/* Cartão do primeiro usuário
            Cada prop (nome, cargo, departamento, ativo) é uma informação passada para o componente */}
        <Cartao
          nome="João Silva"
          cargo="Desenvolvedor"
          departamento="Tecnologia"
          ativo={true}  // true = usuário está ativo (badge verde)
        />

        {/* Cartão do segundo usuário */}
        <Cartao
          nome="Maria Souza"
          cargo="Designer"
          departamento="UX/UI"
          ativo={false}  // false = usuário está inativo (badge cinza)
        />

        {/* Cartão do terceiro usuário */}
        <Cartao
          nome="Carlos Lima"
          cargo="Analista"
          departamento="Financeiro"
          ativo={true}
        />

        {/* Cartão do quarto usuário */}
        <Cartao
          nome="Ana Costa"
          cargo="Gerente"
          departamento="RH"
          ativo={false}
        />

      </View>
    </ScrollView>
  );
}

// StyleSheet.create organiza todos os estilos da tela em um único lugar
// Funciona de forma parecida com o CSS, mas com sintaxe JavaScript
const styles = StyleSheet.create({

  // Estilo do ScrollView (container externo)
  container: {
    flex: 1,                  // ocupa todo o espaço disponível na tela
    backgroundColor: '#f4f6fb', // cor de fundo da tela (azul bem claro)
  },

  // Estilo do conteúdo interno do ScrollView
  conteudo: {
    padding: 16,       // espaçamento interno em todos os lados
    paddingBottom: 28, // espaçamento extra na parte de baixo para não cortar o último card
  },

  // Estilo do título da tela
  titulo: {
    fontSize: 24,        // tamanho da fonte
    fontWeight: 'bold',  // deixa o texto em negrito
    color: '#1e3a5f',    // cor do texto (azul escuro)
    marginBottom: 16,    // espaço abaixo do título antes dos cartões
  },

  // Estilo da View que agrupa os cartões
  // Está vazio porque não precisa de estilos específicos aqui
  // Os cartões já cuidam do próprio espaçamento entre eles
  lista: {},
});

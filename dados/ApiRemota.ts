// ─────────────────────────────────────────────────────────────────────────────
// FLUXO DE CONSTRUÇÃO — Camada de conexão remota: ApiRemota.ts
// Este arquivo concentra as chamadas a uma API REST externa (JSONPlaceholder),
// demonstrando os dois jeitos mais comuns de acessar a rede em React Native:
// a Fetch API (nativa) e a biblioteca Axios.
// Construa este arquivo para entender CONEXÃO EM REDE, em paralelo ao que
// GestorDados.ts já faz para PERSISTÊNCIA LOCAL (AsyncStorage).
// ─────────────────────────────────────────────────────────────────────────────

// ── PASSO 1 — Imports ────────────────────────────────────────────────────────

// 1.1 axios → biblioteca para requisições HTTP, alternativa à Fetch API nativa
//     Instalação: npm install axios
import axios from 'axios';

// ── PASSO 2 — Tipo dos dados remotos ─────────────────────────────────────────

// 2.1 Descreve a "forma" de um post retornado pela API JSONPlaceholder
//     (https://jsonplaceholder.typicode.com) — uma API REST gratuita e pública
//     usada só para teste/estudo, sem necessidade de login ou chave de acesso
export type PostRemoto = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

// ── PASSO 3 — URL base da API ────────────────────────────────────────────────

// 3.1 Endpoint usado em todas as requisições deste arquivo
const URL_BASE = 'https://jsonplaceholder.typicode.com';

// ── PASSO 4 — GET com Fetch API (nativa do React Native) ────────────────────

// 4.1 Busca uma lista de posts remotos usando a Fetch API
//     "async" → função assíncrona, pois a rede leva um tempo para responder
async function buscarPostsComFetch(): Promise<PostRemoto[]> {

  // 4.2 fetch(url) faz a requisição HTTP GET (método padrão quando omitido)
  //     "_limit=5" é um parâmetro do JSONPlaceholder para limitar o retorno
  const resposta = await fetch(`${URL_BASE}/posts?_limit=5`);

  // 4.3 .json() lê o corpo da resposta e converte de texto JSON para objeto
  //     Assim como em GestorDados.ts usamos JSON.parse, o Fetch já entrega
  //     um método pronto para fazer essa conversão
  const dados = await resposta.json();

  return dados as PostRemoto[];
}

// ── PASSO 5 — Instância do Axios ─────────────────────────────────────────────

// 5.1 axios.create() cria uma instância configurada uma única vez:
//     baseURL → evita repetir a URL completa em cada chamada
//     timeout → tempo máximo (ms) de espera antes de desistir da requisição
//     Essa instância é reaproveitada em qualquer chamada Axios deste arquivo
//     (mesmo padrão mostrado no conteúdo em "Gerenciando múltiplas instâncias Axios")
const api = axios.create({
  baseURL: URL_BASE,
  timeout: 5000,
});

// ── PASSO 6 — POST com Axios ─────────────────────────────────────────────────

// 6.1 Envia um novo post para a API usando o método HTTP POST via Axios
//     Recebe título e corpo do post como parâmetros
async function criarPostComAxios(titulo: string, corpo: string): Promise<PostRemoto> {

  // 6.2 api.post(rota, dados) → diferente do fetch, o Axios já serializa
  //     o objeto "dados" para JSON automaticamente (não precisa JSON.stringify)
  const resposta = await api.post('/posts', {
    title: titulo,
    body: corpo,
    userId: 1,
  });

  // 6.3 No Axios, o conteúdo retornado pela API fica em "resposta.data"
  //     (no Fetch seria preciso chamar resposta.json() para conseguir o mesmo)
  //     Atenção: o JSONPlaceholder é uma API fake — ela SIMULA a criação e
  //     devolve um "id" novo, mas não salva nada de fato no servidor
  return resposta.data as PostRemoto;
}

// ── PASSO 7 — Classe ApiRemota ───────────────────────────────────────────────

// 7.1 Agrupa as funções acima, no mesmo padrão usado em GestorDados.ts
//     As telas só precisam chamar: ApiRemota.listar() ou ApiRemota.criar(...)
//     sem precisar saber se por baixo é Fetch ou Axios
export class ApiRemota {

  // 7.2 Lista posts remotos (GET via Fetch)
  //     Exemplo de uso: const lista = await ApiRemota.listar()
  static async listar(): Promise<PostRemoto[]> {
    return await buscarPostsComFetch();
  }

  // 7.3 Cria um novo post remoto (POST via Axios)
  //     Exemplo de uso: const novo = await ApiRemota.criar('Título', 'Texto')
  static async criar(titulo: string, corpo: string): Promise<PostRemoto> {
    return await criarPostComAxios(titulo, corpo);
  }
}

// ── PASSO 8 — Diferença para o módulo de persistência local ─────────────────

// 8.1 Compare com dados/GestorDados.ts:
//     → GestorDados fala com o AsyncStorage (armazenamento DENTRO do celular)
//     → ApiRemota fala com um SERVIDOR externo, pela internet
//
// 8.2 No modelo "Offline First" (citado no conteúdo da disciplina), o ideal
//     é combinar os dois: salvar localmente primeiro (resposta instantânea,
//     funciona sem internet) e sincronizar com o servidor quando possível.
//     Este arquivo cobre apenas a parte "online" dessa equação.

// → Próximo passo: criar app/(tabs)/remoto.tsx, a tela que consome estas funções

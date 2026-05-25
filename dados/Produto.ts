// ─────────────────────────────────────────────────────────────────────────────
// FLUXO DE CONSTRUÇÃO — Modelo de dados: Produto.ts
// Este arquivo define a "forma" de um produto no app.
// Construa este arquivo ANTES de criar o GestorDados.ts e as telas.
// ─────────────────────────────────────────────────────────────────────────────

// ── PASSO 1 — O que é um modelo? ─────────────────────────────────────────────

// 1.1 Um modelo (ou classe) define a estrutura de um dado no sistema.
//     Aqui dizemos: "todo Produto tem um codigo, um nome e uma quantidade".
//     É como criar um molde — todos os produtos seguirão esse formato.

// ── PASSO 2 — Criando a classe Produto ───────────────────────────────────────

// 2.1 "export" → permite que outros arquivos importem e usem essa classe
// 2.2 "class"  → palavra-chave para criar uma classe em TypeScript
export class Produto {

  // 2.3 Atributos da classe — cada produto terá estas três informações:
  //     codigo    → identificador único (número inteiro)
  //     nome      → nome do produto (texto)
  //     quantidade → quantidade em estoque (número inteiro)
  codigo: number;
  nome: string;
  quantidade: number;

  // 2.4 O construtor é chamado quando criamos um novo produto com "new Produto(...)"
  //     Ele recebe os dados e os atribui aos atributos da classe
  constructor(codigo: number, nome: string, quantidade: number) {

    // 2.5 "this" se refere ao objeto que está sendo criado
    //     this.codigo = o atributo "codigo" deste objeto recebe o valor do parâmetro
    this.codigo = codigo;
    this.nome = nome;
    this.quantidade = quantidade;
  }
}

// ── PASSO 3 — Como usar esta classe ──────────────────────────────────────────

// 3.1 Para criar um produto:
//     const p = new Produto(1, 'Banana', 1000)
//     Resultado: p.codigo = 1, p.nome = 'Banana', p.quantidade = 1000

// 3.2 Para serializar (transformar em texto JSON para salvar):
//     const texto = JSON.stringify(p)
//     Resultado: '{"codigo":1,"nome":"Banana","quantidade":1000}'

// 3.3 Para de-serializar (recuperar o objeto a partir do texto JSON):
//     const p2 = JSON.parse(texto) as Produto
//     Resultado: objeto com os mesmos dados de p

// → O GestorDados.ts (próximo arquivo) usa exatamente esses processos
//   para salvar e recuperar produtos do armazenamento local do celular
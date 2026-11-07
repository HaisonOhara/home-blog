export type Category = 'tech' | 'programacao' | 'games' | 'diversos'

export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'quote'; text: string }
  | { type: 'code'; text: string; lang?: string }
  | { type: 'list'; items: string[] }

export interface Post {
  slug: string
  title: string
  excerpt: string
  date: string
  category: Category
  cover: string
  readingTime: number
  tags: string[]
  content: Block[]
}

export const categories: Record<Category, { label: string; color: string }> = {
  tech: { label: 'Tech', color: 'var(--sky)' },
  programacao: { label: 'Programação', color: 'var(--accent)' },
  games: { label: 'Games', color: 'var(--berry)' },
  diversos: { label: 'Diversos', color: 'var(--primary)' },
}

const posts: Post[] = [
  {
    slug: 'codigo-limpo-como-horta',
    title: 'Alguns aprendizados observando o trabalho do time do Cursor',
    excerpt:
      'Que o fluxo de desenvolimento mudou muito com a IA é fato. Mas o que podemos aprender com os times que estão na ponta da inovação?',
    date: '2026-10-08',
    category: 'programacao',
    cover: '/images/posts/codigo-limpo.png',
    readingTime: 6,
    tags: ['clean code', 'refatoração', 'hábitos'],
    content: [
      {
        type: 'p',
        text: 'Toda manhã, antes do café esfriar, eu abro o projeto e faço uma pequena limpeza: renomeio uma variável confusa, apago um comentário que mente, quebro uma função que cresceu demais. Parece pouco. Mas é exatamente assim que uma horta sobrevive.',
      },
      { type: 'h2', text: 'A regra do escoteiro (e do fazendeiro)' },
      {
        type: 'p',
        text: 'Deixe o código um pouquinho melhor do que você encontrou. Não precisa reescrever o módulo inteiro — só tire a erva daninha que está na sua frente.',
      },
      {
        type: 'code',
        lang: 'ts',
        text: `// antes\nfunction calc(a, b, c) {\n  return a * b - c\n}\n\n// depois\nfunction totalComDesconto(preco: number, qtd: number, desconto: number) {\n  return preco * qtd - desconto\n}`,
      },
      {
        type: 'list',
        items: [
          'Nomes que contam uma história',
          'Funções que fazem uma coisa só',
          'Testes como cercas: protegem o que já cresceu',
        ],
      },
      {
        type: 'quote',
        text: 'Uma base de código saudável não nasce pronta. Ela é cultivada, estação após estação.',
      },
      {
        type: 'p',
        text: 'Na próxima vez que bater a vontade de "refatorar tudo no fim de semana", experimente regar um pouquinho por dia. Seu eu do futuro agradece.',
      },
    ],
  },
  {
    slug: 'indies-que-mudaram-minha-vida',
    title: 'Meu top 5 jogos da vida até o momento',
    excerpt:
      'Tem muito rpg, ação e alguns jogos antigos, o primeiro lugar vai te surprender...',
    date: '2026-09-29',
    category: 'games',
    cover: '/images/posts/games-indie.png',
    readingTime: 8,
    tags: ['indie', 'game design', 'ux'],
    content: [
      {
        type: 'p',
        text: 'Jogos indie são feitos por equipes pequenas que precisam acertar no detalhe. E é justamente no detalhe que mora a boa experiência de usuário.',
      },
      { type: 'h2', text: 'Game feel é UX' },
      {
        type: 'p',
        text: 'Aquele pulinho do personagem ao apertar o botão, o som de moeda, a tela tremendo de leve. Tudo isso é feedback. Na web, chamamos de microinterações — e elas funcionam do mesmo jeito.',
      },
      {
        type: 'list',
        items: [
          'Um jogo de fazenda me ensinou sobre loops de hábito',
          'Um plataforma difícil me ensinou sobre recompensar a persistência',
          'Um metroidvania me ensinou sobre navegação e descoberta',
          'Um puzzle minimalista me ensinou sobre onboarding sem tutorial',
          'Um roguelike me ensinou que errar pode ser divertido',
        ],
      },
      {
        type: 'quote',
        text: 'Se o usuário sorri ao clicar num botão, você fez game design sem perceber.',
      },
    ],
  },
  {
    slug: 'ia-na-fazenda',
    title: 'IA Não vai roubar seu emprego, e nem seu prazer em tech',
    excerpt:
      'Como uso ferramentas de IA no dia a dia sem perder o prazer de trabalhar com tecnlogia?',
    date: '2026-09-17',
    category: 'tech',
    cover: '/images/posts/ia-fazenda.png',
    readingTime: 7,
    tags: ['ia', 'produtividade', 'ferramentas'],
    content: [
      {
        type: 'p',
        text: 'Ninguém tem saudade de carregar balde d’água por quilômetros. Os sprinklers chegaram para isso. Com a IA no desenvolvimento, sinto algo parecido.',
      },
      { type: 'h2', text: 'Onde a IA brilha' },
      {
        type: 'list',
        items: [
          'Boilerplate e configurações repetitivas',
          'Primeira versão de testes',
          'Explicar código legado que ninguém lembra quem escreveu',
        ],
      },
      { type: 'h2', text: 'Onde eu continuo no comando' },
      {
        type: 'p',
        text: 'Arquitetura, decisões de produto e aquele cuidado com a experiência que faz alguém voltar ao seu app. Isso ainda é trabalho artesanal.',
      },
    ],
  },
  {
    slug: 'meu-setup-de-terminal',
    title: 'As vezes a desconexão é o melhor caminho',
    excerpt:
      'Uma reflexão sobre a  vida  além das telinhas, manter esse equilibrio é muito importante meu amigo.',
    date: '2026-09-02',
    category: 'diversos',
    cover: '/images/posts/setup-terminal.png',
    readingTime: 5,
    tags: ['terminal', 'setup', 'dotfiles'],
    content: [
      {
        type: 'p',
        text: 'Passo boa parte do dia no terminal, então ele precisa ser um lugar agradável. Aqui vai o meu kit de sobrevivência.',
      },
      {
        type: 'code',
        lang: 'bash',
        text: `# atalhos que uso todo dia\nalias gs="git status -sb"\nalias gl="git log --oneline --graph -15"\nalias dev="pnpm dev"`,
      },
      {
        type: 'list',
        items: ['Tema com tons quentes de madeira', 'Fonte monoespaçada com ligaduras', 'Um prompt minimalista que mostra só o essencial'],
      },
    ],
  },
  {
    slug: 'hobby-e-codigo',
    title: 'Progamar não precisa ser chato, e nem rentável ( as vezes)',
    excerpt:
      'Com o tempo podemos tratar o desenvolvimento de software como mera ferramenta de trabalho, mas existem inumérias vantagens em olharmos o processo como um hobby',
    date: '2026-08-21',
    category: 'diversos',
    cover: '/images/posts/folk-violao.png',
    readingTime: 4,
    tags: ['aprendizado', 'música', 'folk'],
    content: [
      {
        type: 'p',
        text: 'O primeiro Sol maior que toquei soava como uma porta rangendo. O primeiro "Hello World" que escrevi também não foi muito melhor.',
      },
      {
        type: 'quote',
        text: 'Consistência vence talento quando o talento não pratica.',
      },
      {
        type: 'p',
        text: 'Quinze minutos por dia, todos os dias. Para o violão e para o código. Uma hora você olha para trás e percebe que já sabe tocar a música inteira.',
      },
    ],
  },
  {
    slug: 'cacando-bugs-como-rpg',
    title: 'Caçando bugs como o Geralt atrás de um monstrinho',
    excerpt:
      'Um guia de debugging além do console.log()',
    date: '2026-08-05',
    category: 'programacao',
    cover: '/images/posts/speedrun-bugs.png',
    readingTime: 6,
    tags: ['debugging', 'carreira'],
    content: [
      {
        type: 'p',
        text: 'Todo bug é uma masmorra. Você não entra correndo e batendo em tudo — você explora, anota, volta para a cidade quando precisa.',
      },
      { type: 'h2', text: 'Seu inventário de debugging' },
      {
        type: 'list',
        items: [
          'Reproduza o bug antes de qualquer coisa',
          'Isole o problema: divida a masmorra em salas',
          'Logs são tochas — acenda onde está escuro',
          'Explique o problema para um pato de borracha',
        ],
      },
      {
        type: 'code',
        lang: 'ts',
        text: `console.log('[debug] estado antes do chefão:', state)`,
      },
      {
        type: 'p',
        text: 'E quando finalmente vencer o chefão, escreva um teste. É o seu save point.',
      },
    ],
  },
]

export function getAllPosts() {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date))
}

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug)
}

export function getAdjacentPosts(slug: string) {
  const all = getAllPosts()
  const i = all.findIndex((p) => p.slug === slug)
  return { newer: i > 0 ? all[i - 1] : undefined, older: i < all.length - 1 ? all[i + 1] : undefined }
}

const months = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']

export function formatDate(iso: string) {
  const [y, m, d] = iso.split('-').map(Number)
  return `${String(d).padStart(2, '0')} ${months[m - 1]} ${y}`
}

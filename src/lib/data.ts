import type { Category, MenuItem, Neighborhood } from './types';

export const RESTAURANT = {
  name: 'Bella Massa',
  tagline: 'Pizzaria e Lanchonete',
  description:
    'Massa de fermentação natural, ingredientes frescos e entrega rápida em Suzano e região.',
  address: 'Rua das Acácias, 218 — Centro, Suzano — SP',
  whatsapp: '5511911297208',
  instagram: '@bellamassa.oficial',
  minOrderBRL: 30,
  hoursText: 'Terça a Domingo · 18h às 23h',
  openHour: 18,
  closeHour: 23,
  closedDays: [1]
};

export const CATEGORIES: Category[] = [
  { id: 'pizzas', name: 'Pizzas', emoji: '🍕' },
  { id: 'lanches', name: 'Lanches', emoji: '🍔' },
  { id: 'porcoes', name: 'Porções', emoji: '🍟' },
  { id: 'bebidas', name: 'Bebidas', emoji: '🥤' },
  { id: 'sobremesas', name: 'Sobremesas', emoji: '🍰' }
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'p1',
    categoryId: 'pizzas',
    name: 'Pizza Margherita',
    description: 'Molho de tomate, mussarela e manjericão fresco.',
    priceBRL: 45,
    emoji: '🍕',
    popular: true
  },
  {
    id: 'p2',
    categoryId: 'pizzas',
    name: 'Pizza Calabresa',
    description: 'Calabresa fatiada, cebola e azeitona.',
    priceBRL: 48,
    emoji: '🍕',
    popular: true
  },
  {
    id: 'p3',
    categoryId: 'pizzas',
    name: 'Pizza Portuguesa',
    description: 'Presunto, ovos, cebola, azeitona e ervilha.',
    priceBRL: 52,
    emoji: '🍕'
  },
  {
    id: 'p4',
    categoryId: 'pizzas',
    name: 'Pizza Quatro Queijos',
    description: 'Mussarela, provolone, gorgonzola e parmesão.',
    priceBRL: 55,
    emoji: '🍕'
  },
  {
    id: 'p5',
    categoryId: 'pizzas',
    name: 'Pizza Frango com Catupiry',
    description: 'Frango desfiado, catupiry e orégano.',
    priceBRL: 52,
    emoji: '🍕'
  },
  {
    id: 'l1',
    categoryId: 'lanches',
    name: 'X-Burger',
    description: 'Pão brioche, hambúrguer 180g, queijo, alface e tomate.',
    priceBRL: 28,
    emoji: '🍔',
    popular: true
  },
  {
    id: 'l2',
    categoryId: 'lanches',
    name: 'X-Bacon',
    description: 'Pão brioche, hambúrguer 180g, cheddar e bacon crocante.',
    priceBRL: 32,
    emoji: '🍔'
  },
  {
    id: 'l3',
    categoryId: 'lanches',
    name: 'X-Tudo',
    description: 'Hambúrguer, ovo, presunto, queijo, bacon e salada.',
    priceBRL: 35,
    emoji: '🍔'
  },
  {
    id: 'l4',
    categoryId: 'lanches',
    name: 'X-Frango',
    description: 'Filé de frango grelhado, queijo, alface e tomate.',
    priceBRL: 28,
    emoji: '🍔'
  },
  {
    id: 'po1',
    categoryId: 'porcoes',
    name: 'Batata Frita',
    description: 'Porção individual com sal e orégano.',
    priceBRL: 18,
    emoji: '🍟'
  },
  {
    id: 'po2',
    categoryId: 'porcoes',
    name: 'Batata com Cheddar e Bacon',
    description: 'Porção generosa com cheddar cremoso e bacon.',
    priceBRL: 28,
    emoji: '🍟',
    popular: true
  },
  {
    id: 'po3',
    categoryId: 'porcoes',
    name: 'Frango a Passarinho',
    description: '500g de frango temperado e frito.',
    priceBRL: 35,
    emoji: '🍗'
  },
  {
    id: 'po4',
    categoryId: 'porcoes',
    name: 'Calabresa Acebolada',
    description: '500g de calabresa fatiada com cebola.',
    priceBRL: 32,
    emoji: '🌭'
  },
  {
    id: 'b1',
    categoryId: 'bebidas',
    name: 'Coca-Cola Lata',
    description: '350ml gelada.',
    priceBRL: 7,
    emoji: '🥤'
  },
  {
    id: 'b2',
    categoryId: 'bebidas',
    name: 'Guaraná Antarctica Lata',
    description: '350ml gelado.',
    priceBRL: 6,
    emoji: '🥤'
  },
  {
    id: 'b3',
    categoryId: 'bebidas',
    name: 'Suco de Laranja',
    description: '500ml natural, feito na hora.',
    priceBRL: 12,
    emoji: '🧃'
  },
  {
    id: 'b4',
    categoryId: 'bebidas',
    name: 'Cerveja Heineken',
    description: 'Long neck 330ml.',
    priceBRL: 12,
    emoji: '🍺'
  },
  {
    id: 'b5',
    categoryId: 'bebidas',
    name: 'Água Mineral',
    description: '500ml sem gás.',
    priceBRL: 4,
    emoji: '💧'
  },
  {
    id: 's1',
    categoryId: 'sobremesas',
    name: 'Petit Gateau',
    description: 'Bolo quente de chocolate com sorvete de creme.',
    priceBRL: 22,
    emoji: '🍰',
    popular: true
  },
  {
    id: 's2',
    categoryId: 'sobremesas',
    name: 'Pudim de Leite',
    description: 'Fatia generosa, receita da casa.',
    priceBRL: 15,
    emoji: '🍮'
  },
  {
    id: 's3',
    categoryId: 'sobremesas',
    name: 'Açaí 500ml',
    description: 'Com granola e banana.',
    priceBRL: 25,
    emoji: '🍨'
  }
];

export const NEIGHBORHOODS: Neighborhood[] = [
  { name: 'Centro', feeBRL: 5 },
  { name: 'Jardim Suzanópolis', feeBRL: 7 },
  { name: 'Cidade Kemel', feeBRL: 8 },
  { name: 'Vila Urupês', feeBRL: 8 },
  { name: 'Jardim Revista', feeBRL: 10 },
  { name: 'Fora da área', feeBRL: 0, note: 'Taxa a combinar pelo WhatsApp' }
];

export const PAYMENT_METHODS = ['PIX', 'Dinheiro', 'Cartão na entrega'];

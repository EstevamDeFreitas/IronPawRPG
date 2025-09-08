export const TIPO_ITEM = ['Arma', 'Arma Pesada', 'Armadura', 'Capacete', 'Luvas', 'Botas', 'Consumível', 'Acessório', 'Ferramenta', 'Outro'];

export type TipoItem = typeof TIPO_ITEM[number];

export const RARIDADE = ['Comum', 'Incomum', 'Raro', 'Mítico', 'Relíquia'];

export type Raridade = typeof RARIDADE[number];

export type SlotEquipamento = 'Arma Corpo a Corpo' | 'Arma Pesada' | 'Escudo' | 'Arma a Distância' | 'Armadura' | 'Capacete' | 'Luvas' | 'Botas' | 'Acessório' | 'Outro';

export interface Item{
  id: string;
  nome: string;
  descricao: string;
  tipo: TipoItem;
  icone: string;
  raridade: Raridade;
  jogabilidade: string;
  consumivel: boolean;
  efeitos ?: {
    efeito:string;
    propriedadeAfetada:string;
    quantidade:number;
  }[],

}

export interface Inventory {
  equipedItems ?: Partial<Record<string, Item>>;
  itemSlots : {
    item: Item;
    quantidade: number;
  }[],
  dinheiro: number; //Implementar criação de dinheiro no gerenciador de conteudo
}

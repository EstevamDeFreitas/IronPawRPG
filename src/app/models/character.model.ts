export interface PericiaNiveis {
  1: boolean;
  2: boolean;
  3: boolean;
}

export interface Pericias {
  [key: string]: PericiaNiveis;
}

export interface PericiasEspecificas {
  "Conhecimento Geral": string;
  "Conhecimento Específico": string;
  "Ofícios": string;
}

export const CORES = [
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose"
] as const;

export type Cores = typeof CORES[number];

export interface Character {
  nome: string;
  apelido: string;
  idade: string;
  genero: string;
  alinhamento: string;
  altura: string;
  personalidade: string;
  historia: string;
  vinculos: string;
  observacoes: string;
  vocacao: string;
  especie: string;
  vidaAtual: string;
  vidaMaxima: string;
  drive: string;
  imagemPersonagem: string;
  corPersonagem?: Cores;
  pericias: Pericias;
  periciasEspecificas: PericiasEspecificas;
  marcos: string[];
  habilidades: string[];
  inventario: any[];
}



export const PERICIAS_LIST = [
  "Atletismo",
  "Briga",
  "Agilidade",
  "Resistência",
  "Investigação",
  "Conhecimento Geral",
  "Conhecimento Específico",
  "Intuição",
  "Lábia",
  "Intimidação",
  "Interpretação",
  "Mira/Precisão",
  "Medicina/Ofícios",
  "Magia/Manuseio",
  "Furtividade"
] as const;

export type PericiaNome = typeof PERICIAS_LIST[number];

export type Atributo = 'Corpo' | 'Mente' | 'Social' | 'Técnica';

export const PERICIA_ATRIBUTO_MAP: Record<PericiaNome, Atributo> = {
  "Atletismo": "Corpo",
  "Briga": "Corpo",
  "Agilidade": "Corpo",
  "Resistência": "Corpo",
  "Investigação": "Mente",
  "Conhecimento Geral": "Mente",
  "Conhecimento Específico": "Mente",
  "Intuição": "Social",
  "Lábia": "Social",
  "Intimidação": "Social",
  "Interpretação": "Social",
  "Mira/Precisão": "Técnica",
  "Medicina/Ofícios": "Técnica",
  "Magia/Manuseio": "Técnica",
  "Furtividade": "Técnica"
};

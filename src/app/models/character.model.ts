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
  "Medicina/Ofícios": string;
  "Linguagens": string;
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

export interface Milestone {
  titulo: string;
  descricao: string;
  jogabilidade: string;
}

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
  marcos: Milestone[];
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
  "Linguagens",
  "Lábia",
  "Intimidação",
  "Interpretação",
  "Liderança",
  "Mira/Precisão",
  "Medicina/Ofícios",
  "Magia/Manuseio",
  "Furtividade",
  "Intuição",
  "Olfato",
  "Visão",
  "Audição"
] as const;

export type PericiaNome = typeof PERICIAS_LIST[number];

export type Atributo = 'Corpo' | 'Mente' | 'Social' | 'Técnica' | 'Percepções';

export const PERICIA_ATRIBUTO_MAP: Record<PericiaNome, Atributo> = {
  "Atletismo": "Corpo",
  "Briga": "Corpo",
  "Agilidade": "Corpo",
  "Resistência": "Corpo",
  "Investigação": "Mente",
  "Conhecimento Geral": "Mente",
  "Conhecimento Específico": "Mente",
  "Linguagens": "Mente",
  "Lábia": "Social",
  "Intimidação": "Social",
  "Interpretação": "Social",
  "Liderança": "Social",
  "Mira/Precisão": "Técnica",
  "Medicina/Ofícios": "Técnica",
  "Magia/Manuseio": "Técnica",
  "Furtividade": "Técnica",
  "Intuição": "Percepções",
  "Olfato": "Percepções",
  "Visão": "Percepções",
  "Audição": "Percepções"
};

export const PERICIA_TTITLE_MAP: Record<PericiaNome, string> = {
  "Atletismo": "força, movimento físico",
  "Briga": "combate desarmado, agarrões, improviso",
  "Agilidade": "equilíbrio, saltos, destreza",
  "Resistência": "aguentar venenos, suportar dor, segurar respiração",
  "Investigação": "busca de pistas, análise lógica",
  "Conhecimento Geral": "cultura, história, ciências básicas",
  "Conhecimento Específico": "especialidade (magia, engenharia, medicina, etc.)",
  "Linguagens": "compreensão e fala de idiomas",
  "Lábia": "persuasão, engano, charme",
  "Intimidação": "ameaças, coação, imposição",
  "Interpretação": "atuação, expressão, empatia",
  "Liderança": "inspiração, comando, motivação",
  "Mira/Precisão": "foco, pontaria, destreza",
  "Medicina/Ofícios": "cura, habilidades práticas",
  "Magia/Manuseio": "controle mágico, manipulação de objetos",
  "Furtividade": "discrição, camuflagem",
  "Intuição": "percepção, instinto",
  "Olfato": "percepção olfativa",
  "Visão": "percepção visual",
  "Audição": "percepção auditiva"
};

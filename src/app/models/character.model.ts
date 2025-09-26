import { Inventory } from "./inventory.model";

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
  "Arte/Ofícios": string;
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
  cor ?: Cores;
  icone ?:string;
}

export const RECURSOS_CONSUMIVEIS = ['Mana', 'Vigor', 'Estresse', 'Energia'];

export type RecursoConsumivel = typeof RECURSOS_CONSUMIVEIS[number];

export const TIPO_HABILIDADE = ['Magia', 'Técnica', 'Vocação', 'Espécie', 'Marco'];
export type TipoHabilidade = typeof TIPO_HABILIDADE[number];

export interface Hability {
  titulo: string;
  descricao: string;
  gasto: number;
  tipoGasto : RecursoConsumivel;
  tipo: TipoHabilidade;
  jogabilidade: string;
  cor ?: Cores;
  icone ?:string;
  favorito : boolean;
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
  drive: string;
  imagemPersonagem: string;
  gameplay : {
    vidaMax: number;
    vidaAtual: number;
    vidaExtra: number;
    vigorMax: number;
    vigorAtual: number;
    manaMax: number;
    manaAtual: number;
    estresseMax: number;
    estresseAtual: number;
    energiaMax: number;
    energiaAtual: number;

    estresseAnsiosoLimite: number | null;
    estresseTranstornadoLimite: number | null;
    estressePertubadoLimite: number | null;
  }
  corPersonagem?: Cores;
  pericias: Pericias;
  periciasEspecificas: PericiasEspecificas;
  marcos: Milestone[];
  habilidades: Hability[];
  inventario: Inventory;
}



export const PERICIAS_LIST = [
  "Atletismo",
  "Briga",
  "Agilidade",
  "Fortitude",
  "Investigação",
  "Conhecimento Geral",
  "Conhecimento Específico",
  "Linguagens",
  "Lábia",
  "Intimidação",
  "Interpretação",
  "Liderança",
  "Precisão",
  "Arte/Ofícios",
  "Medicina",
  "Magia",
  "Manuseio",
  "Furtividade",
  "Intuição",
  "Olfato",
  "Visão",
  "Audição"
] as const;

export type PericiaNome = typeof PERICIAS_LIST[number];

export type Atributo = 'Corpo' | 'Mente' | 'Presença' | 'Técnica' | 'Percepções';

export const PERICIA_ATRIBUTO_MAP: Record<PericiaNome, Atributo> = {
  "Atletismo": "Corpo",
  "Briga": "Corpo",
  "Agilidade": "Corpo",
  "Fortitude": "Corpo",
  "Investigação": "Mente",
  "Conhecimento Geral": "Mente",
  "Conhecimento Específico": "Mente",
  "Linguagens": "Mente",
  "Lábia": "Presença",
  "Intimidação": "Presença",
  "Interpretação": "Presença",
  "Liderança": "Presença",
  "Precisão": "Técnica",
  "Arte/Ofícios": "Técnica",
  "Manuseio": "Técnica",
  "Magia": "Técnica",
  "Medicina": "Técnica",
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
  "Fortitude": "aguentar venenos, suportar dor, segurar respiração",
  "Investigação": "busca de pistas, análise lógica",
  "Conhecimento Geral": "cultura, história, ciências básicas",
  "Conhecimento Específico": "especialidade (magia, engenharia, medicina, etc.)",
  "Linguagens": "compreensão e fala de idiomas",
  "Lábia": "persuasão, engano, charme",
  "Intimidação": "ameaças, coação, imposição",
  "Interpretação": "atuação, expressão, empatia",
  "Liderança": "inspiração, comando, motivação",
  "Precisão": "foco, pontaria, destreza",
  "Arte/Ofícios": "habilidades práticas",
  "Magia": "controle mágico, conjuração",
  "Manuseio": "uso de ferramentas, armas, dispositivos",
  "Medicina": "cura, primeiros socorros, anatomia",
  "Furtividade": "discrição, camuflagem",
  "Intuição": "percepção, instinto",
  "Olfato": "percepção olfativa",
  "Visão": "percepção visual",
  "Audição": "percepção auditiva"
};

export interface AxieDetail {
  auction?: {
    currentPriceUSD: string;
    currentPrice: string;
  } | null;
  class?: string;
  id?: string;
  image?: string;
  name?: string;
  parts?: Parts[];
  stats?: Stats;
}

export interface Parts {
  id: string;
  class: string;
  abilities: any[];
  stage: number;
  type: string;
}

export interface Stats {
  hp: number;
  speed: number;
  skill: number;
  morale: number;
}

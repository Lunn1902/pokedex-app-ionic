export interface Stat {
  base_stat: number;
  stat: {
    name: string;
  };
}

export class Pokemon {
  id!: number;
  name!: string;
  type1!: string;
  type2?: string;
  sprite!: string;
  height!: number;
  weight!: number;
  stats!: Stat[];
  abilities!: string[];
  hiddenAbility?: string;
}

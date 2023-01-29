export interface Pokemon {
  type: [PokemonType] | [PokemonType, PokemonType]
  name: {
    en: string
    zh: string
    jp: string
  }
  no: number
  form?: PokemonForm[]
}

export interface PokemonIV {
  hp: number
  att: number
  def: number
  s_att: number
  s_def: number
  spd: number
}

export interface PokemonWithIV extends Pokemon {
  iv: PokemonIV
}

export enum PokemonType {
  Normal = "normal",
  Fire = "fire",
  Water = "water",
  Electric = "electric",
  Grass = "grass",
  Ice = "ice",
  Fighting = "fighting",
  Poison = "poison",
  Ground = "ground",
  Flying = "flying",
  Psychic = "psychic",
  Bug = "bug",
  Rock = "rock",
  Ghost = "ghost",
  Dragon = "dragon",
  Dark = "dark",
  Steel = "steel",
  Fairy = "fairy",
  Unknown = "unknown"
}

export type PokemonForm = Omit<PokemonWithIV, "no" | "name" | "form"> & { form: string[] }
export type PokemonFormMap = Record<number, PokemonForm[]>
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type PokemonFormTmp = Record<number, PartialBy<PokemonForm, "form">[]>

export enum SupportLang {
  EN, JP, ZH
}
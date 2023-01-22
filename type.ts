export interface Pokemon {
  type: [PokemonType] | [PokemonType, PokemonType]
  name: {
    en: string
    zh: string
    jp: string
  }
  no: number
}

export interface PokemonIV {
  hp: number
  att: number
  def: number
  sAtt: number
  sDef: number
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
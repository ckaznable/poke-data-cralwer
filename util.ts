import { PokemonType } from "./type.js"

export function getTypeZHToEN(zh: string): PokemonType {
  switch(zh) {
    case "一般": return PokemonType.Normal
    case "草": return PokemonType.Grass
    case "水": return PokemonType.Water
    case "火": return PokemonType.Fire
    case "電": return PokemonType.Electric
    case "飛行": return PokemonType.Flying
    case "格鬥": return PokemonType.Fighting
    case "岩石": return PokemonType.Rock
    case "地面": return PokemonType.Ground
    case "鋼": return PokemonType.Steel
    case "蟲": return PokemonType.Bug
    case "惡": return PokemonType.Dark
    case "冰": return PokemonType.Ice
    case "妖精": return PokemonType.Fairy
    case "龍": return PokemonType.Dragon
    case "超能力": return PokemonType.Psychic
    case "幽靈": return PokemonType.Ghost
    case "毒": return PokemonType.Poison
  }

  return PokemonType.Unknown
}

export function getDomTextNumber(dom: HTMLElement) {
  const str = dom.textContent as string
  const match = str.match(/\d+/g)
  if(match?.length) {
    return +match[0]
  }

  return 0
}

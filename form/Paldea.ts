import { PokemonFormTmp, PokemonType } from "../type.js"
import { fillRegionForm } from "../util.js"

const form = ["Paldea"]
const data: PokemonFormTmp = {
  128: [
    {
      form: ["Combat Breed"],
      type: [PokemonType.Fighting],
      ability: [22, 83, 291],
      iv: {
        hp: 75,
        att: 110,
        def: 105,
        s_att: 30,
        s_def: 70,
        spd: 100
      }
    },
    {
      form: ["Blaze Breed"],
      type: [PokemonType.Fighting, PokemonType.Fire],
      ability: [22, 83, 291],
      iv: {
        hp: 75,
        att: 110,
        def: 105,
        s_att: 30,
        s_def: 70,
        spd: 100
      }
    },
    {
      form: ["Aqua Breed"],
      type: [PokemonType.Fighting, PokemonType.Water],
      ability: [22, 83, 291],
      iv: {
        hp: 75,
        att: 110,
        def: 105,
        s_att: 30,
        s_def: 70,
        spd: 100
      }
    }
  ],
  194: [{
    type: [PokemonType.Poison, PokemonType.Ground],
    ability: [38, 11, 109],
    iv: {
      hp: 55,
      att: 45,
      def: 45,
      s_att: 25,
      s_def: 25,
      spd: 15
    }
  }],
}

export default fillRegionForm(data, form)
import { PokemonFormTmp, PokemonType } from "../type.js"
import { fillRegionForm } from "../util.js"

const form = ["Alola"]
let data: PokemonFormTmp = {
  19: [{
    type: [PokemonType.Normal, PokemonType.Dark],
    iv: {
      hp: 30,
      att: 56,
      def: 35,
      s_att: 25,
      s_def: 35,
      spd: 72
    }
  }],
  20: [{
    type: [PokemonType.Normal, PokemonType.Dark],
    iv: {
      hp: 75,
      att: 71,
      def: 70,
      s_att: 40,
      s_def: 80,
      spd: 77
    }
  }],
  26: [{
    type: [PokemonType.Electric, PokemonType.Psychic],
    iv: {
      hp: 60,
      att: 85,
      def: 50,
      s_att: 95,
      s_def: 85,
      spd: 110
    }
  }],
  27: [{
    type: [PokemonType.Ice, PokemonType.Steel],
    iv: {
      hp: 50,
      att: 75,
      def: 90,
      s_att: 10,
      s_def: 35,
      spd: 40
    }
  }],
  28: [{
    type: [PokemonType.Ice, PokemonType.Steel],
    iv: {
      hp: 75,
      att: 100,
      def: 120,
      s_att: 25,
      s_def: 65,
      spd: 65
    }
  }],
  29: [{
    type: [PokemonType.Ice],
    iv: {
      hp: 38,
      att: 41,
      def: 40,
      s_att: 50,
      s_def: 65,
      spd: 65
    }
  }],
  30: [{
    type: [PokemonType.Ice, PokemonType.Fairy],
    iv: {
      hp: 73,
      att: 67,
      def: 75,
      s_att: 81,
      s_def: 100,
      spd: 109
    }
  }],
  50: [{
    type: [PokemonType.Ground, PokemonType.Steel],
    iv: {
      hp: 10,
      att: 55,
      def: 30,
      s_att: 35,
      s_def: 45,
      spd: 90
    }
  }],
  51: [{
    type: [PokemonType.Ground, PokemonType.Steel],
    iv: {
      hp: 35,
      att: 100,
      def: 60,
      s_att: 50,
      s_def: 70,
      spd: 110
    }
  }],
  52: [{
    type: [PokemonType.Dark],
    iv: {
      hp: 40,
      att: 35,
      def: 35,
      s_att: 50,
      s_def: 40,
      spd: 90
    }
  }],
  53: [{
    type: [PokemonType.Dark],
    iv: {
      hp: 65,
      att: 60,
      def: 60,
      s_att: 75,
      s_def: 65,
      spd: 115
    }
  }],
  74: [{
    type: [PokemonType.Ground, PokemonType.Electric],
    iv: {
      hp: 40,
      att: 80,
      def: 100,
      s_att: 30,
      s_def: 30,
      spd: 20
    }
  }],
  75: [{
    type: [PokemonType.Ground, PokemonType.Electric],
    iv: {
      hp: 55,
      att: 95,
      def: 115,
      s_att: 45,
      s_def: 45,
      spd: 35
    }
  }],
  76: [{
    type: [PokemonType.Ground, PokemonType.Electric],
    iv: {
      hp: 80,
      att: 120,
      def: 130,
      s_att: 55,
      s_def: 65,
      spd: 45
    }
  }],
  88: [{
    type: [PokemonType.Poison, PokemonType.Dark],
    iv: {
      hp: 80,
      att: 80,
      def: 50,
      s_att: 40,
      s_def: 50,
      spd: 25
    }
  }],
  89: [{
    type: [PokemonType.Poison, PokemonType.Dark],
    iv: {
      hp: 105,
      att: 105,
      def: 75,
      s_att: 65,
      s_def: 100,
      spd: 50
    }
  }],
  103: [{
    type: [PokemonType.Grass, PokemonType.Dragon],
    iv: {
      hp: 95,
      att: 105,
      def: 85,
      s_att: 125,
      s_def: 75,
      spd: 45
    }
  }],
  105: [{
    type: [PokemonType.Fire, PokemonType.Ghost],
    iv: {
      hp: 60,
      att: 80,
      def: 110,
      s_att: 50,
      s_def: 80,
      spd: 45
    }
  }],
}

export default fillRegionForm(data, form)
import { PokemonFormTmp, PokemonType } from "../type.js"
import { fillRegionForm } from "../util.js"

const form = ["Galar"]
const data: PokemonFormTmp = {
  52: [{
    type: [PokemonType.Steel],
    iv: {
      hp: 50,
      att: 65,
      def: 55,
      s_att: 40,
      s_def: 40,
      spd: 40
    }
  }],
  77: [{
    type: [PokemonType.Psychic],
    iv: {
      hp: 50,
      att: 85,
      def: 55,
      s_att: 65,
      s_def: 65,
      spd: 90
    }
  }],
  78: [{
    type: [PokemonType.Psychic, PokemonType.Fairy],
    iv: {
      hp: 65,
      att: 100,
      def: 70,
      s_att: 80,
      s_def: 80,
      spd: 105
    }
  }],
  79: [{
    type: [PokemonType.Psychic],
    iv: {
      hp: 90,
      att: 65,
      def: 65,
      s_att: 40,
      s_def: 40,
      spd: 15
    }
  }],
  80: [{
    type: [PokemonType.Poison, PokemonType.Psychic],
    iv: {
      hp: 95,
      att: 100,
      def: 95,
      s_att: 100,
      s_def: 70,
      spd: 30
    }
  }],
  83: [{
    type: [PokemonType.Fighting],
    iv: {
      hp: 52,
      att: 95,
      def: 55,
      s_att: 58,
      s_def: 62,
      spd: 55
    }
  }],
  110: [{
    type: [PokemonType.Poison, PokemonType.Fairy],
    iv: {
      hp: 65,
      att: 90,
      def: 120,
      s_att: 85,
      s_def: 70,
      spd: 60
    }
  }],
  122: [{
    type: [PokemonType.Ice, PokemonType.Psychic],
    iv: {
      hp: 50,
      att: 65,
      def: 65,
      s_att: 90,
      s_def: 90,
      spd: 100
    }
  }],
  144: [{
    type: [PokemonType.Psychic, PokemonType.Flying],
    iv: {
      hp: 90,
      att: 85,
      def: 85,
      s_att: 125,
      s_def: 100,
      spd: 95
    }
  }],
  145: [{
    type: [PokemonType.Fighting, PokemonType.Flying],
    iv: {
      hp: 90,
      att: 125,
      def: 90,
      s_att: 85,
      s_def: 90,
      spd: 100
    }
  }],
  146: [{
    type: [PokemonType.Dark, PokemonType.Flying],
    iv: {
      hp: 90,
      att: 85,
      def: 90,
      s_att: 100,
      s_def: 125,
      spd: 90
    }
  }],
  199: [{
    type: [PokemonType.Poison, PokemonType.Psychic],
    iv: {
      hp: 95,
      att: 65,
      def: 80,
      s_att: 110,
      s_def: 110,
      spd: 30
    }
  }],
  222: [{
    type: [PokemonType.Ghost],
    iv: {
      hp: 60,
      att: 55,
      def: 100,
      s_att: 65,
      s_def: 100,
      spd: 30
    }
  }],
  263: [{
    type: [PokemonType.Dark, PokemonType.Normal],
    iv: {
      hp: 38,
      att: 30,
      def: 41,
      s_att: 30,
      s_def: 41,
      spd: 60
    }
  }],
  264: [{
    type: [PokemonType.Dark, PokemonType.Normal],
    iv: {
      hp: 78,
      att: 70,
      def: 61,
      s_att: 50,
      s_def: 61,
      spd: 100
    }
  }],
  554: [{
    type: [PokemonType.Ice],
    iv: {
      hp: 70,
      att: 90,
      def: 45,
      s_att: 15,
      s_def: 45,
      spd: 50
    }
  }],
  555: [
    {
      type: [PokemonType.Ice],
      iv: {
        hp: 105,
        att: 140,
        def: 55,
        s_att: 30,
        s_def: 55,
        spd: 95
      }
    },
    {
      form: ["Zen Mode"],
      type: [PokemonType.Ice, PokemonType.Fire],
      iv: {
        hp: 105,
        att: 160,
        def: 55,
        s_att: 30,
        s_def: 55,
        spd: 135
      }
    }
  ],
  562: [{
    type: [PokemonType.Ground, PokemonType.Ghost],
    iv: {
      hp: 38,
      att: 55,
      def: 85,
      s_att: 30,
      s_def: 65,
      spd: 30
    }
  }],
  618: [{
    type: [PokemonType.Ground, PokemonType.Steel],
    iv: {
      hp: 109,
      att: 81,
      def: 99,
      s_att: 66,
      s_def: 84,
      spd: 32
    }
  }],
}

export default fillRegionForm(data, form)
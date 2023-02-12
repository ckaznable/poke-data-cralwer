import { PokemonFormTmp, PokemonType } from "../type.js"
import { fillRegionForm } from "../util.js"

const form = ["Hisui"]
const data: PokemonFormTmp = {
  58: [{
    type: [PokemonType.Fire, PokemonType.Rock],
    ability: [22, 18, 69],
    iv: {
      hp: 60,
      att: 75,
      def: 45,
      s_att: 65,
      s_def: 50,
      spd: 55
    }
  }],
  59: [{
    type: [PokemonType.Psychic],
    ability: [22, 18, 69],
    iv: {
      hp: 95,
      att: 115,
      def: 80,
      s_att: 95,
      s_def: 80,
      spd: 90
    }
  }],
  101: [{
    type: [PokemonType.Electric, PokemonType.Grass],
    ability: [43, 9, 106],
    iv: {
      hp: 40,
      att: 30,
      def: 50,
      s_att: 55,
      s_def: 55,
      spd: 100
    }
  }],
  102: [{
    type: [PokemonType.Electric, PokemonType.Grass],
    ability: [43, 9, 106],
    iv: {
      hp: 60,
      att: 50,
      def: 70,
      s_att: 80,
      s_def: 80,
      spd: 150
    }
  }],
  157: [{
    type: [PokemonType.Fire, PokemonType.Ghost],
    ability: [66, 119],
    iv: {
      hp: 73,
      att: 84,
      def: 78,
      s_att: 119,
      s_def: 85,
      spd: 95
    }
  }],
  211: [{
    type: [PokemonType.Dark, PokemonType.Poison],
    ability: [38, 33, 22],
    iv: {
      hp: 65,
      att: 95,
      def: 85,
      s_att: 55,
      s_def: 55,
      spd: 85
    }
  }],
  215: [{
    type: [PokemonType.Fighting, PokemonType.Poison],
    ability: [39, 51, 124],
    iv: {
      hp: 55,
      att: 95,
      def: 55,
      s_att: 35,
      s_def: 75,
      spd: 115
    }
  }],
  503: [{
    type: [PokemonType.Water, PokemonType.Dark],
    ability: [67, 292],
    iv: {
      hp: 90,
      att: 108,
      def: 80,
      s_att: 100,
      s_def: 65,
      spd: 85
    }
  }],
  549: [{
    type: [PokemonType.Grass, PokemonType.Fighting],
    ability: [34, 55, 102],
    iv: {
      hp: 70,
      att: 105,
      def: 75,
      s_att: 50,
      s_def: 75,
      spd: 105
    }
  }],
  570: [{
    type: [PokemonType.Normal, PokemonType.Ghost],
    ability: [149],
    iv: {
      hp: 35,
      att: 60,
      def: 40,
      s_att: 85,
      s_def: 40,
      spd: 70
    }
  }],
  571: [{
    type: [PokemonType.Normal, PokemonType.Ghost],
    ability: [149],
    iv: {
      hp: 55,
      att: 100,
      def: 60,
      s_att: 125,
      s_def: 60,
      spd: 110
    }
  }],
  628: [{
    type: [PokemonType.Psychic, PokemonType.Flying],
    ability: [51, 125, 110],
    iv: {
      hp: 110,
      att: 83,
      def: 83,
      s_att: 113,
      s_def: 40,
      spd: 65
    }
  }],
  705: [{
    type: [PokemonType.Steel, PokemonType.Dragon],
    ability: [157, 75, 183],
    iv: {
      hp: 58,
      att: 75,
      def: 83,
      s_att: 83,
      s_def: 113,
      spd: 40
    }
  }],
  706: [{
    type: [PokemonType.Steel, PokemonType.Dragon],
    ability: [157, 75, 183],
    iv: {
      hp: 80,
      att: 100,
      def: 100,
      s_att: 110,
      s_def: 150,
      spd: 60
    }
  }],
  713: [{
    type: [PokemonType.Ice, PokemonType.Rock],
    ability: [173, 115, 5],
    iv: {
      hp: 95,
      att: 127,
      def: 184,
      s_att: 34,
      s_def: 36,
      spd: 38
    }
  }],
  724: [{
    type: [PokemonType.Grass, PokemonType.Fighting],
    ability: [65, 113],
    iv: {
      hp: 88,
      att: 112,
      def: 80,
      s_att: 95,
      s_def: 95,
      spd: 60
    }
  }],
  550: [
    {
      form: ["Red-Striped"],
      type: [PokemonType.Water],
      ability: [120, 91, 104],
      iv: {
        hp: 70,
        att: 92,
        def: 65,
        s_att: 80,
        s_def: 55,
        spd: 98
      }
    },
    {
      form: ["Blue-Striped"],
      type: [PokemonType.Water],
      ability: [69, 91, 104],
      iv: {
        hp: 70,
        att: 92,
        def: 65,
        s_att: 80,
        s_def: 55,
        spd: 98
      }
    },
    {
      form: ["White-Striped"],
      type: [PokemonType.Water],
      ability: [155, 91, 104],
      iv: {
        hp: 70,
        att: 92,
        def: 65,
        s_att: 80,
        s_def: 55,
        spd: 98
      }
    }
  ],
}

export default fillRegionForm(data, form)
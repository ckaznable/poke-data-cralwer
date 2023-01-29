import { PokemonForm, PokemonFormMap, PokemonType } from "../type.js"

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

const form = ["Hisui"]
const data: Record<number, PartialBy<PokemonForm, "form">[]> = {
  58: [{
    type: [PokemonType.Fire, PokemonType.Rock],
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
    iv: {
      hp: 88,
      att: 112,
      def: 80,
      s_att: 95,
      s_def: 95,
      spd: 60
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

let fillData: PokemonFormMap = {}
for (const key in data) {
  const _data = data[key] as unknown as PokemonForm[]
  fillData[key] = _data.map(i => {
    i.form = [...form, ...(i.form || [])]
    return i
  })
}

export default fillData as PokemonFormMap
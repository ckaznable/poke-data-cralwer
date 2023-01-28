import Alola from "./Alola.js"
import Galar from "./Galar.js"
import _ from "lodash"
import { PokemonFormMap } from "../type.js"

function customizer(objValue: PokemonFormMap, srcValue: PokemonFormMap) {
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue);
  }

  return srcValue
}

function _merge(...f: PokemonFormMap[]): PokemonFormMap {
  return f.reduce((obj, pm, i) => {
    if(i === f.length - 1 || !f[i + 1]) {
      return obj
    }

    return _.mergeWith(pm, f[i + 1], customizer)
  }, {} as PokemonFormMap)
}

export default _merge(Alola, Galar)
import { JSDOM } from "jsdom"
import fetch from "node-fetch"
import { getDomTextNumber, getTypeZHToEN } from "./util.js"
import { writeFileSync } from "node:fs"
import { mkdirp } from 'mkdirp'

import type { Pokemon, PokemonIV, PokemonType, PokemonWithIV } from "./type"

async function getUrlDoc(url: string) {
  const { window } = new JSDOM(await (await (await fetch(url)).text()).replace(/[\n\t\r]/g, ""))
  const { document } = window
  return document
}

async function getPokemonList(): Promise<Pokemon[]> {
  const document = await getUrlDoc("https://wiki.52poke.com/zh-hant/%E5%AE%9D%E5%8F%AF%E6%A2%A6%E5%88%97%E8%A1%A8%EF%BC%88%E6%8C%89%E5%85%A8%E5%9B%BD%E5%9B%BE%E9%89%B4%E7%BC%96%E5%8F%B7%EF%BC%89")
  const pmList = Array.from(document.querySelectorAll(".eplist tbody tr"))
  const noSet = new Set<number>()

  return pmList.reduce((list, pm) => {
    const data = Array.from(pm.querySelectorAll<HTMLTableColElement>("td"))
    if(!data.length) {
      return list
    }

    const no = getDomTextNumber(data[0])
    if (noSet.has(no)) {
      return list
    }

    noSet.add(no)
    const type: [PokemonType] | [PokemonType, PokemonType] = [getTypeZHToEN(data[5].textContent as string)]
    if(data.length === 6) {
      type.push(getTypeZHToEN(data[6].textContent as string))
    }

    list.push({
      no,
      name: {
        zh: data[2].textContent?.replace("*", "") as string,
        jp: data[3].textContent as string,
        en: data[4].textContent as string,
      },
      type
    })

    return list
  }, [] as Pokemon[])
}

async function getPokemonWithIV(): Promise<Record<number, PokemonIV>> {
  const document = await getUrlDoc("https://www.serebii.net/pokemon/all.shtml")
  const pmList = Array.from(document.querySelectorAll(".dextable tbody tr"))

  return pmList.reduce((list, pm) => {
    const data = pm.querySelectorAll("td")
    if(data.length !== 12) {
      return list
    }

    list[getDomTextNumber(data[0])] = {
      hp: getDomTextNumber(data[6]),
      att: getDomTextNumber(data[7]),
      def: getDomTextNumber(data[8]),
      s_att: getDomTextNumber(data[9]),
      s_def: getDomTextNumber(data[10]),
      spd: getDomTextNumber(data[11])
    }

    return list
  }, {} as Record<number, PokemonIV>)
}

function merge(pm: Pokemon[], pmiv: Record<number, PokemonIV>): PokemonWithIV[] {
  return pm.map<PokemonWithIV>(pokemon => ({
    ...pokemon,
    iv: pmiv[pokemon.no]
  }))
}

async function main() {
  const data = merge(await getPokemonList(), await getPokemonWithIV())
  await mkdirp("./dist")
  writeFileSync("./dist/out.json", JSON.stringify(data))
}

;(async () => {
  await main()
})()
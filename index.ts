import { JSDOM } from "jsdom"
import fetch from "node-fetch"
import { getDomTextNumber, getTypeZHToEN } from "./util.js"
import { writeFileSync } from "node:fs"
import { mkdirp } from "mkdirp"
import Form from "./form/index.js"
import { t } from "./translate.js"

import { Pokemon, PokemonIV, PokemonType, PokemonWithIV, SupportLang } from "./type.js"

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
    if (data.length === 7) {
      const enumT = getTypeZHToEN(data[6].textContent as string)
      if(enumT != PokemonType.Unknown) {
        type.push(enumT)
      }
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

function pushForm(pm: PokemonWithIV[]): PokemonWithIV[] {
  return pm.map(_pm => {
    if(_pm.no in Form) {
      _pm.form = Form[_pm.no]
    }

    return _pm
  })
}

function flatForm(pm: PokemonWithIV[]): PokemonWithIV[] {
  return pm.reduce((list, _pm) => {
    list.push(_pm)

    if (_pm.no in Form) {
      Form[_pm.no].forEach(__pm => {
        list.push({
          ...__pm,
          name: {
            jp: `${_pm.name.jp} - ${__pm.form.map(f => t(f, SupportLang.JP)).join(" ")}`,
            zh: `${_pm.name.zh} - ${__pm.form.map(f => t(f, SupportLang.ZH)).join(" ")}`,
            en: `${_pm.name.en} - ${__pm.form.join(" ")}`,
          },
          no: _pm.no,
          form: undefined
        })
      })
    }

    return list
  }, [] as PokemonWithIV[])
}

async function main() {
  const mergedData = merge(await getPokemonList(), await getPokemonWithIV())
  await mkdirp("./dist")

  const data = pushForm(mergedData)
  writeFileSync("./dist/pokemon.json", JSON.stringify(data))

  const flatData = flatForm(mergedData)
  writeFileSync("./dist/pokemon_flat.json", JSON.stringify(flatData))
}

;(async () => {
  await main()
})()
import { writeFileSync } from "fs"
import data from "../dist/pokemon_flat.json"

const cleaned = data.filter(p => {
  return !p.name.en.includes("- Hisui") && !p.name.en.includes("- Paldea")
})

writeFileSync(`${__dirname}/../dist/pokemon_flat.json`, JSON.stringify(cleaned))

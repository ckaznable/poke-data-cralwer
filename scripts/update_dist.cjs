const { JSDOM } = require("jsdom");
const fs = require("fs");
const path = require("path");

const CACHE = (f) => path.join(__dirname, "../.cache", f);
const DIST = (f) => path.join(__dirname, "../dist", f);

function readHtml(file) {
  return fs.readFileSync(CACHE(file), "utf8");
}

function getDomTextNumber(dom) {
  const str = dom.textContent || "";
  const match = str.match(/\d+/g);
  return match && match.length ? +match[0] : 0;
}

const typeZHtoEN = {
  "一般": "normal", "草": "grass", "水": "water", "火": "fire",
  "電": "electric", "飛行": "flying", "格鬥": "fighting", "岩石": "rock",
  "地面": "ground", "鋼": "steel", "蟲": "bug", "惡": "dark",
  "冰": "ice", "妖精": "fairy", "龍": "dragon", "超能力": "psychic",
  "幽靈": "ghost", "毒": "poison",
};

// 1. Parse Pokemon list from 52poke
function parsePokemonList() {
  const html = readHtml("52poke_list.html");
  const dom = new JSDOM(html);
  const doc = dom.window.document;
  const rows = Array.from(doc.querySelectorAll(".eplist tbody tr"));
  const noSet = new Set();
  const list = [];

  for (const row of rows) {
    const tds = Array.from(row.querySelectorAll("td"));
    if (!tds.length) continue;

    const no = getDomTextNumber(tds[0]);
    if (noSet.has(no) || no === 0) continue;
    noSet.add(no);

    const type = [];
    const t1 = (tds[6].textContent || "").trim();
    if (t1 && typeZHtoEN[t1]) {
      type.push(typeZHtoEN[t1]);
    }
    if (tds.length >= 8) {
      const t2 = (tds[7].textContent || "").trim();
      if (t2 && typeZHtoEN[t2]) {
        type.push(typeZHtoEN[t2]);
      }
    }

    if (!type.length) type.push("unknown");

    list.push({
      no,
      name: {
        zh: (tds[3].textContent || "").replace("*", "").trim(),
        jp: (tds[4].textContent || "").trim(),
        en: (tds[5].textContent || "").trim(),
      },
      type,
    });
  }

  console.log(`Pokemon list: ${list.length} entries (last: #${list[list.length - 1]?.no})`);
  return list;
}

// 2. Parse base stats from Serebii
function parseStats() {
  const html = readHtml("serebii_stats.html");
  const dom = new JSDOM(html);
  const doc = dom.window.document;
  const rows = Array.from(doc.querySelectorAll(".dextable tbody tr"));
  const stats = {};

  for (const row of rows) {
    const tds = row.querySelectorAll("td");
    if (tds.length !== 12) continue;

    const no = getDomTextNumber(tds[0]);
    if (no === 0) continue;

    stats[no] = {
      hp: getDomTextNumber(tds[6]),
      att: getDomTextNumber(tds[7]),
      def: getDomTextNumber(tds[8]),
      s_att: getDomTextNumber(tds[9]),
      s_def: getDomTextNumber(tds[10]),
      spd: getDomTextNumber(tds[11]),
    };
  }

  console.log(`Stats: ${Object.keys(stats).length} entries`);
  return stats;
}

// 3. Parse ZH abilities from 52poke (also has JP and EN names)
function parseZHAbilities() {
  const html = readHtml("52poke_ability.html");
  const dom = new JSDOM(html);
  const doc = dom.window.document;
  const rows = Array.from(doc.querySelectorAll(".fulltable tbody tr"));
  const abilities = {};
  const trimNo = (s) => s.endsWith("*") ? s.slice(0, -1) : s;

  for (const row of rows) {
    const tds = Array.from(row.querySelectorAll("td"));
    if (!tds.length) continue;

    const no = +(trimNo((tds[0].textContent || "").trim()));
    if (!no) continue;

    abilities[no] = {
      no,
      name: (tds[1].textContent || "").trim(),
      desc: (tds[4].textContent || "").trim(),
    };
  }

  console.log(`ZH abilities: ${Object.keys(abilities).length} entries`);
  return abilities;
}

// 4. Parse EN abilities from Bulbapedia
function parseENAbilities() {
  const html = readHtml("bulba_ability.html");
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  // Try the original selector first
  const tables = Array.from(doc.querySelectorAll("h2 + table.roundy"));
  const abilities = {};

  if (tables.length > 0) {
    const table = tables[tables.length - 1];
    // The table might have a nested structure. Let's try finding all rows with ability data
    const rows = Array.from(table.querySelectorAll("tbody tr"));

    for (const row of rows) {
      const tds = Array.from(row.querySelectorAll("td"));
      if (tds.length < 3) continue;

      const noText = (tds[0].textContent || "").trim();
      const no = +noText;
      if (!no) continue;

      abilities[no] = {
        no,
        name: (tds[1].textContent || "").trim(),
        desc: (tds[2].textContent || "").trim(),
      };
    }
  }

  // If the roundy table approach didn't work well, try alternative approach
  if (Object.keys(abilities).length < 100) {
    console.log("EN abilities: roundy table approach got few results, trying alternative...");
    // Try all tables
    const allTables = Array.from(doc.querySelectorAll("table"));
    for (const table of allTables) {
      const rows = Array.from(table.querySelectorAll("tr"));
      for (const row of rows) {
        const tds = Array.from(row.querySelectorAll("td"));
        if (tds.length < 3) continue;
        const no = +(tds[0].textContent || "").trim();
        if (!no || no > 400) continue;
        const name = (tds[1].textContent || "").trim();
        const desc = (tds[2].textContent || "").trim();
        if (name && desc && !abilities[no]) {
          abilities[no] = { no, name, desc };
        }
      }
    }
  }

  console.log(`EN abilities: ${Object.keys(abilities).length} entries`);
  return abilities;
}

// 5. Parse JP abilities
function parseJPAbilities() {
  const html = readHtml("jp_ability.html");
  const dom = new JSDOM(html);
  const doc = dom.window.document;
  const rows = Array.from(doc.querySelectorAll("table.bluetable.sortable tbody tr"));
  const abilities = {};

  for (const row of rows) {
    const tds = Array.from(row.querySelectorAll("td"));
    if (!tds.length) continue;

    const no = +(tds[0].textContent || "").trim();
    if (!no) continue;

    abilities[no] = {
      no,
      name: (tds[1].textContent || "").trim(),
      desc: (tds[2].textContent || "").trim(),
    };
  }

  console.log(`JP abilities: ${Object.keys(abilities).length} entries`);
  return abilities;
}

// 6. Parse Pokemon-ability mapping from Bulbapedia
function parsePokemonAbilities(abilityMap) {
  const html = readHtml("bulba_pm_ability.html");
  const dom = new JSDOM(html);
  const doc = dom.window.document;
  const rows = Array.from(doc.querySelectorAll(".sortable tbody tr"));
  const pmAbilities = {};

  for (const row of rows) {
    const tds = Array.from(row.querySelectorAll("td"));
    if (!tds.length) continue;

    const pmno = getDomTextNumber(tds[0]);
    if (!pmno) continue;

    const abilityList = [];
    // Columns: no, img, name, ability1, ability2, hidden_ability
    for (let i = 3; i <= 5; i++) {
      if (tds[i]) {
        const name = (tds[i].textContent || "").trim();
        // Remove generation markers like "Gen IX+"
        const cleanName = name.replace(/Gen [IVX]+\+?/g, "").trim();
        if (cleanName && cleanName in abilityMap) {
          abilityList.push(abilityMap[cleanName].no);
        }
      }
    }

    if (!pmAbilities[pmno]) {
      pmAbilities[pmno] = abilityList;
    }
  }

  console.log(`Pokemon abilities: ${Object.keys(pmAbilities).length} entries`);
  return pmAbilities;
}

// 7. Build merged ability map
function buildAbilityMap(zh, en, jp) {
  const result = {};
  for (const _no of Object.keys(zh)) {
    const no = +_no;
    if (!en[no]) {
      console.warn(`  Warning: EN ability #${no} missing, skipping`);
      continue;
    }

    result[en[no].name] = {
      no,
      name: {
        zh: zh[no]?.name || "",
        en: en[no]?.name || "",
        jp: jp[no]?.name || "",
      },
      desc: {
        zh: zh[no]?.desc || "",
        en: en[no]?.desc || "",
        jp: jp[no]?.desc || "",
      },
    };
  }
  return result;
}

// 8. Load existing form data from dist
function loadForms() {
  try {
    const existing = JSON.parse(fs.readFileSync(DIST("pokemon.json"), "utf8"));
    const forms = {};
    for (const pm of existing) {
      if (pm.form) {
        forms[pm.no] = pm.form;
      }
    }
    console.log(`Forms: ${Object.keys(forms).length} Pokemon with forms`);
    return forms;
  } catch (e) {
    console.log("Could not load existing forms, skipping");
    return {};
  }
}

// Translation maps for flat form names
const zhTranslate = {
  "Alola": "阿羅拉", "Galar": "伽勒爾", "Paldea": "帕底亞", "Hisui": "洗翠",
  "Combat Breed": "鬥戰種", "Blaze Breed": "火熾種", "Aqua Breed": "水瀾種",
  "Zen Mode": "達摩模式", "Red-Striped": "紅條紋", "Blue-Striped": "藍條紋",
  "White-Striped": "白條紋",
};
const jpTranslate = {
  "Alola": "アローラ", "Galar": "ガラル", "Paldea": "パルデア", "Hisui": "ヒスイ",
  "Combat Breed": "コンバットしゅ", "Blaze Breed": "ブレイズしゅ", "Aqua Breed": "ウォーターしゅ",
  "Zen Mode": "ダルマモード", "Red-Striped": "あかすじのすがた", "Blue-Striped": "あおすじのすがた",
  "White-Striped": "しろすじのすがた",
};

function tZH(s) { return zhTranslate[s] || s; }
function tJP(s) { return jpTranslate[s] || s; }

// Main
function main() {
  console.log("Parsing sources...\n");

  const pokemonList = parsePokemonList();
  const stats = parseStats();
  const zhAbilities = parseZHAbilities();
  const enAbilities = parseENAbilities();
  const jpAbilities = parseJPAbilities();

  console.log("\nBuilding ability map...");
  const abilityMap = buildAbilityMap(zhAbilities, enAbilities, jpAbilities);
  console.log(`Ability map: ${Object.keys(abilityMap).length} entries`);

  const pmAbilities = parsePokemonAbilities(abilityMap);
  const forms = loadForms();

  console.log("\nMerging data...");

  // Build pokemon.json
  const pokemonData = pokemonList.map((pm) => {
    const entry = {
      no: pm.no,
      name: pm.name,
      type: pm.type,
      iv: stats[pm.no] || { hp: 0, att: 0, def: 0, s_att: 0, s_def: 0, spd: 0 },
      ability: pmAbilities[pm.no] || [],
    };
    if (forms[pm.no]) {
      entry.form = forms[pm.no];
    }
    return entry;
  });

  // Build pokemon_flat.json (expand forms but exclude Hisui and Paldea per clean_flat.ts)
  const pokemonFlat = pokemonList.reduce((list, pm) => {
    const entry = {
      no: pm.no,
      name: pm.name,
      type: pm.type,
      iv: stats[pm.no] || { hp: 0, att: 0, def: 0, s_att: 0, s_def: 0, spd: 0 },
      ability: pmAbilities[pm.no] || [],
    };
    list.push(entry);

    if (forms[pm.no]) {
      for (const form of forms[pm.no]) {
        // Skip Hisui and Paldea forms (per clean_flat.ts)
        if (form.form && (form.form.includes("Hisui") || form.form.includes("Paldea"))) {
          continue;
        }
        list.push({
          ...form,
          name: {
            jp: `${pm.name.jp} - ${(form.form || []).map(f => tJP(f)).join(" ")}`,
            zh: `${pm.name.zh} - ${(form.form || []).map(f => tZH(f)).join(" ")}`,
            en: `${pm.name.en} - ${(form.form || []).join(" ")}`,
          },
          no: pm.no,
          form: undefined,
        });
      }
    }

    return list;
  }, []);

  // Build ability.json
  const abilityOutput = {};
  for (const a of Object.values(abilityMap)) {
    abilityOutput[a.no] = a;
  }

  // Write output
  fs.mkdirSync(path.join(__dirname, "../dist"), { recursive: true });
  fs.writeFileSync(DIST("pokemon.json"), JSON.stringify(pokemonData));
  fs.writeFileSync(DIST("pokemon_flat.json"), JSON.stringify(pokemonFlat));
  fs.writeFileSync(DIST("ability.json"), JSON.stringify(abilityOutput));

  console.log(`\nDone!`);
  console.log(`  pokemon.json: ${pokemonData.length} entries`);
  console.log(`  pokemon_flat.json: ${pokemonFlat.length} entries`);
  console.log(`  ability.json: ${Object.keys(abilityOutput).length} entries`);
}

main();

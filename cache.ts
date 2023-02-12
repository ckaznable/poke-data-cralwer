import { existsSync, readFileSync, writeFileSync } from "fs"
import { mkdirp } from "mkdirp"
import fetch from "node-fetch"

const CACHE_DIR = "./.cache"
let cache: Record<string, string> = {}

export async function getHtml(url: string): Promise<string> {
  const cacheFileName = "html"
  if(!Object.keys(cache).length && existsSync(`${CACHE_DIR}/${cacheFileName}`)) {
    cache = getFSCache(cacheFileName) || {}
  }

  if(url in cache) {
    return cache[url]
  }

  const html = (await (await fetch(url)).text()).replace(/[\n\t\r]/g, "")
  cache[url] = html
  storeCache(cacheFileName, cache)
  return html
}

async function storeCache(filename: string, data: any) {
  await mkdirp(CACHE_DIR)
  writeFileSync(`${CACHE_DIR}/${filename}`, JSON.stringify(data))
}

function getFSCache(filename: string): Record<string, string> {
  return JSON.parse(readFileSync(`${CACHE_DIR}/${filename}`, 'utf8')) || {}
}
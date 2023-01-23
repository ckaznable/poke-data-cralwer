# Pokemon Data Crawler

generate pokemon data json and cralwer from [wiki.52poke.com](https://wiki.52poke.com) and [www.serebii.net](https://https://www.serebii.net)

## Using

`npm i`

`npm start`

you can found json in dist dictionary.

## Data struct

```typescript
[
  {
    type: [string] | [string, string]
    name: {
      en: string
      zh: string
      jp: string
    }
    no: number
    iv: {
      hp: number
      att: number
      def: number
      s_att: number
      s_def: number
      spd: number
    }
  }
  ...
]
```
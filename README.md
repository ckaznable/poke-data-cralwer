# Pokemon Data Crawler

generate pokemon data json and cralwer from [wiki.52poke.com](https://wiki.52poke.com) and [www.serebii.net](https://https://www.serebii.net)

## Using

you can found `pokemon.json` and `pokemon_flat.json` in dist dictionary.

# Roadmap

- [x] pokemon iv and type data
- [x] pokemon translate name
- [ ] move data
- [ ] ability data

## Data struct

`pokemon.json`

region form is in `form` fields.

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
    },
    form?: [
      {
        type: [string] | [string, string],
        iv: {
          hp: number
          att: number
          def: number
          s_att: number
          s_def: number
          spd: number
        }
      },
      ...
    ],
  }
  ...
]
```

`pokemon_flat.json`

region form are set on layer 1

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
    },
  }
  ...
]
```
import {CheatCode} from "./cheats.types";
import {MAX_CODE_LENGTH} from "./cheats.config";


type Config = Record<CheatCode, () => void>


const cheatCodeListener = (config: Config) => {
  const callbackToFire: EventListener = (evt) => {
    const value = (evt.target as any)?.value
    if (!value) {
      return void undefined
    }
    const normalizedValue = value.toLowerCase()

    // Memory string clearing rules.
    if (normalizedValue.length >= MAX_CODE_LENGTH) {
      return void undefined
    }

    const maybeCheatCode = normalizedValue as CheatCode
    if (config[maybeCheatCode]) {
      const exe = config[maybeCheatCode]
      exe()
      alert(maybeCheatCode + ' - cheat entered.')
    }
  }

  window.addEventListener(
    'input',
    callbackToFire,
    true)
}


export const cheatCodeLoader = async (config: Config) => {
  cheatCodeListener(config)
}

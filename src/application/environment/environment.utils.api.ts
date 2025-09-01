import {isStringTypeNarrower} from '@msalek/utils'
import {RAW_ENV_VARS_NOT_USE} from './environment.config'


export const IS_DEVELOPMENT_ENV = (): boolean => process.env.NODE_ENV === 'development'

export const IS_PRODUCTION_ENV = (): boolean => process.env.NODE_ENV === 'production'

export const getEnvironmentMode = () => process.env.NODE_ENV


declare global {
  interface Window {
    ENV_VARS: Record<string, string>
  }
}
export const GET_ENV_VARS = () => {
  const valuesArray: (string | undefined)[] = Object.keys(RAW_ENV_VARS_NOT_USE)

  if (valuesArray.every(value => isStringTypeNarrower(value) && value.length > 0)) {
    return RAW_ENV_VARS_NOT_USE
  } else {
    console.error('WARNING')
    console.warn('WARNING')
    console.error('WARNING')
    console.warn('WARNING')
    throw new Error('!!! NOT VALID ENV CONFIG !!!')
  }
}

export const ENV_VARS = GET_ENV_VARS()

if (IS_DEVELOPMENT_ENV()) {
  typeof window !== 'undefined' && (
    () => {
      window.ENV_VARS = ENV_VARS
    })()
}

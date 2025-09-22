import {ENV_VARS} from "./environment.config";

export const IS_DEVELOPMENT_ENV = (): boolean => process.env.NODE_ENV === 'development'

export const IS_PRODUCTION_ENV = (): boolean => process.env.NODE_ENV === 'production'

export const getEnvironmentMode = () => {
  if (ENV_VARS.NEXT_PUBLIC_NODE_ENV_MANUAL) {
    return ENV_VARS.NEXT_PUBLIC_NODE_ENV_MANUAL
  } else {
    return 'NODE_ENV_MANUAL-not-provided'
  }
}


declare global {
  interface Window {
    ENV_VARS: Record<string, string>
  }
}

if (!IS_PRODUCTION_ENV()) {
  typeof window !== 'undefined' && (
    () => {
      window.ENV_VARS = ENV_VARS
    })()
}

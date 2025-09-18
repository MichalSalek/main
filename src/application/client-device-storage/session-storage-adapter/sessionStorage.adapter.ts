import {reportIssue} from '../../error-debugger/errorHandler.possibilities.api'


export const getSessionStorage = (key: string): string | null => {
  if (!sessionStorage) {
    reportIssue(
      'No sessionStorage access!',
      key)
    return null
  }

  return sessionStorage.getItem(key)
}


export const deleteSessionStorage = (key: string): void => {
  if (!sessionStorage) {
    reportIssue(
      'No sessionStorage access!',
      key)
    return void undefined
  }

  sessionStorage.removeItem(key)
}


export const setSessionStorage = (key: string, value: string): void => {
  if (!sessionStorage) {
    reportIssue(
      'No sessionStorage access!',
      key)
    return void undefined
  }

  sessionStorage.setItem(
    key,
    value)
}


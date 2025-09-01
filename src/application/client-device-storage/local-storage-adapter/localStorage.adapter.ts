import {reportIssue} from '../../error-debugger/errorHandler.possibilities.api'


export const getLocalStorage = (key: string): string | null => {
  if (!localStorage) {
    reportIssue(
      'No localStorage access!',
      key)
    return null
  }

  return localStorage.getItem(key)
}


export const deleteLocalStorage = (key: string): void => {
  if (!localStorage) {
    reportIssue(
      'No localStorage access!',
      key)
    return void undefined
  }

  localStorage.removeItem(key)
}


export const setLocalStorage = (key: string, value: string): void => {
  if (!localStorage) {
    reportIssue(
      'No localStorage access!',
      key)
    return void undefined
  }

  localStorage.setItem(
    key,
    value)
}


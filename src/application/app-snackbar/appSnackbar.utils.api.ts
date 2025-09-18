import {SnackbarWrapper} from './appSnackbar.types'


export const generateAppAlertWrapper = (message: string, color: SnackbarWrapper['color'] = 'success'): SnackbarWrapper => (
  {
    message,
    color
  })

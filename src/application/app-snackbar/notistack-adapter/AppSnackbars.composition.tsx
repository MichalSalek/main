import {Button, Slide} from '@mui/material'
import {closeSnackbar, enqueueSnackbar, SnackbarProvider} from 'notistack'
import {ReactNode, useEffect} from 'react'
import {useAppSelector} from '../../store/store'
import {SNACKBAR_MAX_SNACKS, SNACKBAR_TIMEOUT} from '../appSnackbar.config'
import style from '../appSnackbar.module.scss'
import {STORE_SEL_snackbar_snackbars} from '../appSnackbar.read'
import {SnackbarWrapper} from '../appSnackbar.types'


// https://notistack.com/api-reference


export const AppSnackbarsComposition = ({children}: {
  children: ReactNode
}) => {
  const snackbarsCollection: SnackbarWrapper[] = useAppSelector(STORE_SEL_snackbar_snackbars)

  useEffect(
    () => {
      if (snackbarsCollection.length === 0) {
        return () => undefined
      }

      enqueueSnackbar(
        snackbarsCollection[0].message,
        {variant: snackbarsCollection[0].color})

      return () => undefined
    },
    [snackbarsCollection])

  return (
    <SnackbarProvider
      classes={{
        root: style.appSnackbarRootStyle,
        containerRoot: style.appSnackbarContainerRootStyle,
      }}
      TransitionComponent={Slide}
      maxSnack={SNACKBAR_MAX_SNACKS}
      autoHideDuration={SNACKBAR_TIMEOUT}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      action={(snackbarId) => (
        <Button
          variant={'outlined'}
          color={'inherit'}
          onClick={() => closeSnackbar(snackbarId)}>
          ok
        </Button>)}
    >
      {children}
    </SnackbarProvider>)
}


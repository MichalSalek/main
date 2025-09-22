import {ReactElement, useEffect} from 'react'
import {useAppSelector} from '../../store/store'
import {SNACKBAR_MAX_SNACKS, SNACKBAR_TIMEOUT} from '../appSnackbar.config'
import {STORE_SEL_snackbar_snackbars} from '../appSnackbar.read'
import {SnackbarWrapper} from '../appSnackbar.types'
import {toast, Toaster} from 'sonner';
import scss from '../appSnackbar.module.scss'
import {getAppIcon} from '../../../domain/app-icons/adapters/MuiIcons.adapter';

// https://sonner.emilkowal.ski/


export const AppSnackbarsController = (): ReactElement => {
  const snackbarsCollection: SnackbarWrapper[] = useAppSelector(STORE_SEL_snackbar_snackbars)

  useEffect(
    () => {
      if (snackbarsCollection.length === 0) {
        return () => undefined
      }

      toast[snackbarsCollection[0].color](
        snackbarsCollection[0].message,
        {
          // description: getDateNowInString({getISOFormat: false, withTimestamp: false}),
          duration: SNACKBAR_TIMEOUT
        })

      return () => undefined
    },
    [snackbarsCollection])

  return <Toaster
    className={scss.sonnerRoot}
    closeButton={false}
    richColors={false}
    position={'top-right'}
    visibleToasts={SNACKBAR_MAX_SNACKS}
    expand={true}
    icons={{
      success: getAppIcon.Success(),
      info: getAppIcon.Info(),
      warning: getAppIcon.Warning(),
      error: getAppIcon.Error(),
      loading: getAppIcon.Loading(),
    }}
  />

}


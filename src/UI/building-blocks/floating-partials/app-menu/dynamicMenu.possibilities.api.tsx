import {useSetActonButtonsHook} from '../../../application-hooks/useSetActonButtons.hook';
import {getAppIcon} from '../../../../domain/app-icons/adapters/MuiIcons.adapter';
import {useCallback} from 'react';


export const useSetLoadingIcon = () => {
  const setActionButtons = useSetActonButtonsHook()
  return useCallback(() => {
    setActionButtons([{
      title: 'W TOKU',
      action: () => undefined,
      icon: getAppIcon.Loading
    }])
  }, [setActionButtons])
}

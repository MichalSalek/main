import {ButtonProps} from '@mui/material'
import {HTMLAttributes, ReactElement, useCallback} from 'react'
import {deleteUserSelf_IO} from '../../../domain/user/userIO.possibilities.api'
import {USER_DTO_API_V1} from '../../../READONLY-shared-kernel/models/user/user.dto'
import {ConfirmButtonAtom} from '../_wide-use-components/ConfirmButton.atom'


type Props = {
  req: USER_DTO_API_V1['DELETE_SELF']['REQUEST']
  passProps?: ButtonProps & HTMLAttributes<HTMLButtonElement>
}
export const DeleteUserSelfAtom = (props: Props): ReactElement => {


  const deleteUserSelfCallback = useCallback(
    async () => {
      void deleteUserSelf_IO(
        props.req,
        async (res) => {

        },
        async (error) => {
        })
    },
    [props])


  return <>

    <ConfirmButtonAtom

      passProps={props.passProps}

      actionText={'Usuń konto'}

      actionCallback={deleteUserSelfCallback}/>

  </>
}

import {Button, Paper, Stack, Typography} from '@mui/material'
import {ReactElement, useCallback, useEffect, useState} from 'react'
import {useAppSelector} from '../../../../application/store/store'
import {becomeUser_IO} from '../../../../domain/admin/adminActionsIO.possibilities.api'
import {getDateForUI} from '../../../features/UI.utils.api'
import {STORE_SEL_user_currentUser} from '../../../../domain/user/user.read'
import {UserNoSensitiveWithRelationsExtended} from '../../../../READONLY-shared-kernel/models/user/user.types'
import {PERMISSIONS_POLICY} from '../../../../READONLY-shared-kernel/policies/permissions.policy'
import {ActionButtonsMolecule} from './ActionButtons.molecule'
import {LineRecordAtom} from './LineRecord.atom'
import {User} from '../../../../READONLY-shared-kernel/models/db_models';
import {
  getAccountStatusUI,
  getPaymentStatusUI,
  getRoleUI
} from '../../account-and-user-operations/userAndAccountUI.api';
import {getPricingPlanUI} from '../../pricing-plan/pricingPlanUI.api';


const UserRecordMolecule = (
  {
    user,
    id
  }: {
    user: UserNoSensitiveWithRelationsExtended
    id: User['user_id']
  }): ReactElement => {

  const currentUser = useAppSelector(STORE_SEL_user_currentUser)


  const becomeCallback = useCallback(
    async () => {
      await becomeUser_IO(
        {user_id: user.user_id},
        async (response) => {

        },
        async (error) => {
        })
    },
    [user.user_id])

  const [disabledForAdmin, setDisabledForAdmin] = useState<boolean>(false)

  useEffect(
    () => {
      setDisabledForAdmin(PERMISSIONS_POLICY.utils.IS_ADMIN(user))
    },
    [user,
      user.role])


  return <Paper
    id={String(id)}
    key={id}
    variant={'outlined'}
    sx={{
      backgroundColor: currentUser?.email === user.email
        ? 'rgba(3,12,64,0.15)'
        : 'transparent',
      margin: '3px',
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
      minWidth: '320px',
      width: '100%',
      maxWidth: '480px',
      justifyContent: 'space-between'
    }}>

    <Stack>

      <LineRecordAtom
        el2={<Button
          disabled={disabledForAdmin}
          variant={'text'}
          onClick={becomeCallback}>Become</Button>}
        el1={user.is_active
          ? <Typography sx={{
            color: 'green',
            fontWeight: 600
          }}>User aktywny</Typography>
          : <Typography sx={{
            color: 'red',
            fontWeight: 600
          }}>User wyłączony</Typography>}
      />

      {user.display_name && <LineRecordAtom el1={'Nazwa: '} el2={user.display_name}
      />}
      <LineRecordAtom el1={'Email: '} el2={user.email}/>
      <LineRecordAtom el1={'Rola: '} el2={getRoleUI(user.role)}/>
      <LineRecordAtom el1={'Stan płatności: '} el2={getPaymentStatusUI(user.account.payment_status)}/>
      <LineRecordAtom el1={'Stan konta: '} el2={getAccountStatusUI(user.account.account_status)}/>
      <LineRecordAtom el1={'Kiedy konto wygasa: '} el2={getDateForUI(user.account.account_expiration_date)}/>
      <LineRecordAtom el1={'Pricing plan: '} el2={getPricingPlanUI(user.account.pricing_plan)}/>
      <LineRecordAtom el1={'Utworzono: '} el2={getDateForUI(user.created_at)}/>
      <LineRecordAtom el1={'Data płatności: '} el2={getDateForUI(user.account.upcoming_payment_date)}/>
      <LineRecordAtom el1={'Aktywne sesje: '} el2={String(user.sessions.length)}/>

    </Stack>


    <Stack sx={{
      alignItems: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap'
    }}>

      <ActionButtonsMolecule user={user}/>

    </Stack>

  </Paper>
}


export default UserRecordMolecule
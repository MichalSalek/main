import {useMemo} from 'react'
import {useAppSelector} from '../../../../application/store/store'
import {STORE_SEL_user_currentUser} from '../../../../domain/user/user.read'
import {USER_POLICY} from '../../../../READONLY-shared-kernel/policies/user.policy'
import {AccountOrganism} from '../../../../UI/building-blocks/account-and-user-operations/Account.organism'
import {NoAccountOrganism} from '../../../../UI/building-blocks/account-and-user-operations/NoAccount.organism'


export default function Account() {
  const currentUser = useAppSelector(STORE_SEL_user_currentUser)

  const hasAccount = useMemo<boolean>(
    () => USER_POLICY.utils.CAN_USER_HAVE_ACTIVE_ACCOUNT(currentUser),
    [currentUser])

  return <>
    {hasAccount
      ? <AccountOrganism/>
      : <NoAccountOrganism/>}

  </>
}


export async function getStaticProps() {
  return {
    props: {}
  }
}


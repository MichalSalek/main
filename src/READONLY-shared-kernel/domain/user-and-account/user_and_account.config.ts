import {AccountStatus, AccountStatusValue} from '../../models/db_models'


export const activeAccountStates: Readonly<AccountStatus[]> = [
  AccountStatusValue.ACTIVE,
  AccountStatusValue.EXPIRING_IN_PROGRESS
] as const

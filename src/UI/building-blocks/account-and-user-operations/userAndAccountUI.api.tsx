import {
  AccountStatus,
  AccountStatusValueFlipped,
  PaymentStatus,
  PaymentStatusValueFlipped,
  Role,
  RoleValueFlipped
} from '../../../READONLY-shared-kernel/models/db_models';


export const getRoleUI = (roleValue: Role | null | undefined): string => {
  if (!roleValue) {
    return 'Brak'
  }

  return RoleValueFlipped[roleValue]
}


export const getAccountStatusUI = (accountStatusValue: AccountStatus | null | undefined): string => {
  if (!accountStatusValue) {
    return 'Brak'
  }

  return AccountStatusValueFlipped[accountStatusValue]
}


export const getPaymentStatusUI = (paymentStatusValue: PaymentStatus | null | undefined): string => {
  if (!paymentStatusValue) {
    return 'Brak'
  }

  return PaymentStatusValueFlipped[paymentStatusValue]
}

import {createContext} from 'react'
import {UserNoSensitiveWithRelationsExtended} from '../../READONLY-shared-kernel/models/user/user.types'


export type AdminContextType = {
  appUsers: UserNoSensitiveWithRelationsExtended[]
  setAppUsers: (appUsers: UserNoSensitiveWithRelationsExtended[]) => void
  updateAppUsers: () => void
}

export const adminContextInitialValue: AdminContextType = {
  appUsers: [],
  setAppUsers: () => undefined,
  updateAppUsers: () => undefined
}

export const AdminContext = createContext<AdminContextType>(adminContextInitialValue)

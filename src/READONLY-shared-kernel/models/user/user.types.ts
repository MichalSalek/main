import {Session, User, UserNoSensitive, UserRelationsAll} from '../db_models'


export type UserMetadata = {
  client_ip: string | undefined,
  language: string | undefined,
  user_agent: string | undefined,
  location: string | undefined,
}


export type UserWithRelations = Pick<UserRelationsAll, 'account'> & User

export type UserNoSensitiveWithRelations = Pick<UserRelationsAll, 'account'> & UserNoSensitive


export type UserWithRelationsExtended = Pick<UserRelationsAll, 'account' | 'sessions'> & User

export type UserNoSensitiveWithRelationsExtended = Pick<UserRelationsAll, 'account' | 'sessions'> & UserNoSensitive


export type CurrentUser = UserNoSensitiveWithRelations & Record<'session', Session>


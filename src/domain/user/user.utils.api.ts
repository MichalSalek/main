import {handlePromiseWithTimeout} from '@msalek/utils'
import {reportIssue} from '../../application/error-debugger/errorHandler.possibilities.api'
import {UserMetadata} from '../../READONLY-shared-kernel/models/user/user.types'


export const getUserMetadata = async (): Promise<UserMetadata> => {
  const returnUndefinedObject = {
    client_ip: undefined,
    language: undefined,
    user_agent: undefined,
    location: undefined
  }

  try {
    const responseIP = await handlePromiseWithTimeout<Response>(fetch('https://api.ipify.org?format=json'))
    const responseIPJSON = await responseIP.json() as {
      ip: string
    } | undefined

    return {
      ...returnUndefinedObject,
      client_ip: responseIPJSON?.ip,
      language: navigator.language,
      user_agent: navigator.userAgent
    }
  } catch (error) {
    reportIssue(
      'getUserMetadata failed.',
      error)
    return returnUndefinedObject
  }

}

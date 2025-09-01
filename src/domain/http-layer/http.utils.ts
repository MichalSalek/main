import {RawAxiosRequestHeaders} from 'axios'
import {getFromClientStorage} from '../../application/client-device-storage/clientStorage.possibilities.api'
import {reduxStore} from '../../application/store/store'
import {CUSTOM_HEADERS} from '../../READONLY-shared-kernel/domain/http/http.config'


export const requestHeadersSetter = async (): Promise<RawAxiosRequestHeaders | Record<string, string>> => {

  const userMetadata = JSON.stringify(reduxStore.getState().userSlice?.userMetadata)

  const authorization = getFromClientStorage({key: CUSTOM_HEADERS['authorization']})

  const becomeUser = getFromClientStorage({key: CUSTOM_HEADERS['becomeUser']})

  const pathname = typeof location !== 'undefined'
    ? window.location.pathname
    : 'NOT_FROM_BROWSER'

  return (
    {
      [CUSTOM_HEADERS['userMetadata']]: userMetadata,
      [CUSTOM_HEADERS['authorization']]: authorization,
      [CUSTOM_HEADERS['becomeUser']]: becomeUser,
      [CUSTOM_HEADERS['pathname']]: pathname,
    }
  )
}



import {getDateNowInString} from '@msalek/utils'
import {IS_DEVELOPMENT_ENV} from '../environment/environment.utils.api'
import {SendToErrorTracker, sendToErrorTracker} from './errorTracker.possibilities.api'


type Payload = string | Error | object | unknown | undefined
type Mode = 'info' | 'warn' | 'error'
export const reportIssue = (title: string, payload: Payload, mode: Mode = 'error'): void => {
  const dateNow = getDateNowInString()
  const issuePrefix = `[ ${mode.toUpperCase()} ${dateNow} ] `

  if (IS_DEVELOPMENT_ENV()) {
    console[mode]([issuePrefix,
      title,
      payload])

  } else {

    const errorTrackerPayload: SendToErrorTracker = {
      message: issuePrefix + title,
      payload,
      mode
    }
    sendToErrorTracker(errorTrackerPayload)
  }
}

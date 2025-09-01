import {projectID} from './errorTracker.config'


type Payload = string | Error | object | unknown | undefined

export type SendToErrorTracker = {
  message: string
  payload: Payload
}

export const sendToErrorTracker = (payload: SendToErrorTracker) => {
  console.log('Sending to error tracker:')
  console.log(payload)
  console.log(projectID)
}

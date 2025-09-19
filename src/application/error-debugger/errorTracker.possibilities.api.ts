import * as Sentry from '@sentry/nextjs'


type Payload = string | Error | object | unknown | undefined
type Mode = 'info' | 'warn' | 'error'
export type SendToErrorTracker = {
  message: string
  payload: Payload
  mode: Mode
}

export const sendToErrorTracker = (props: SendToErrorTracker) => {

  let errorPayload = {}

  if (typeof props.payload === 'object' && props.payload !== null) {
    errorPayload = props.payload
  } else {
    errorPayload = JSON.stringify(props.payload)
  }

  Sentry.logger[props.mode](props.message, errorPayload)
}

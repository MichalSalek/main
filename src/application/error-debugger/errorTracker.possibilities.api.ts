import * as Sentry from '@sentry/nextjs'


type Payload = string | Error | object | unknown | undefined

export type SendToErrorTracker = {
  message: string
  payload: Payload
}

export const sendToErrorTracker = (payload: SendToErrorTracker) => {

  let errorPayload = {}

  if (typeof payload.payload === 'object' && payload.payload !== null) {
    errorPayload = payload.payload
  } else {
    errorPayload = JSON.stringify(payload.payload)
  }

  Sentry.logger.error(payload.message, errorPayload)
}

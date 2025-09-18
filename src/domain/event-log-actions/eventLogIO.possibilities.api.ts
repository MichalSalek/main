import {callHTTPEndpoint} from '../../application/http-layer/http.operations.api'
import {ENDPOINTS} from '../../READONLY-shared-kernel/domain/http/http.endpoints'

import {EVENT_LOG_DTO_API_V1} from '../../READONLY-shared-kernel/models/event-log/event_log.dto'


export const getEventLogs_IO: EVENT_LOG_DTO_API_V1['GET_ALL']['IO_CLIENT_FUNCTION'] = async (
  req,
  successCallback,
  errorCallback) => {
  await callHTTPEndpoint<EVENT_LOG_DTO_API_V1['GET_ALL']['RESPONSE'], EVENT_LOG_DTO_API_V1['GET_ALL']['RESPONSE_ERROR']>({
    config: {
      url: ENDPOINTS.EVENT_LOG_GET_ALL,
      mode: 'post',
      payload: req
    },
    successCallback: async (response) => {
      await successCallback(response)
    },
    errorCallback: async (error) => {
      await errorCallback(error)
    }
  })
}



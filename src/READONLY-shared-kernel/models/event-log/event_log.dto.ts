import { IOClientFunctionReqResErr } from '../../application/http/http.client.types'
import { DetailedErrorPayload }      from '../../application/http/http.types'
import { EventLog, EventLogType }    from '../db_models'




export type EVENT_LOG_DTO_API_V1 = {

  GET_ALL: {
    REQUEST: Record<'type', EventLogType>
    RESPONSE: EventLog[]
    RESPONSE_ERROR: DetailedErrorPayload<EVENT_LOG_DTO_API_V1['GET_ALL']['REQUEST']>
    IO_CLIENT_FUNCTION: IOClientFunctionReqResErr<EVENT_LOG_DTO_API_V1['GET_ALL']['REQUEST'], EVENT_LOG_DTO_API_V1['GET_ALL']['RESPONSE'], EVENT_LOG_DTO_API_V1['GET_ALL']['RESPONSE_ERROR']>
  },

}

import { EVENT_INFO_TYPE }         from '../../domain/commands-and-queries/cqrs.types'
import { HTTPStatus }              from '../../domain/http/http.config'
import { InfoEventWithPayloadDTO } from './http.types'




export const getValidatedStatusCode = (statusCode: HTTPStatus): HTTPStatus => statusCode


export const getInfoEventWithPayloadDTO = <DataPayload>(props: InfoEventWithPayloadDTO<DataPayload>): InfoEventWithPayloadDTO<DataPayload> => props

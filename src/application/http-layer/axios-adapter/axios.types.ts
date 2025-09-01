import {AxiosError, AxiosResponse} from 'axios'


export type HTTPAdapterSuccess<T> = AxiosResponse<T>

export type HTTPAdapterError<T> = AxiosError<T>

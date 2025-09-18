export type HTTPMethod = 'post' | 'get'

export type HTTPStatus = 200 | 201 | 400 | 401 | 402 | 404 | 405 | 406 | 500 | 503

export const API_VER = '/api/v1/'

export const CUSTOM_HEADERS = {
  authorization: 'authorization',
  userMetadata: 'user-metadata',
  becomeUser: 'become-user',
  pathname: 'pathname'
} as const



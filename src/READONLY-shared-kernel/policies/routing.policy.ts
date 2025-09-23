// @ts-ignore
import {NextRouter} from 'next/router'
import {EVENT_INFO_TYPE} from '../domain/commands-and-queries/cqrs.types'
import {
  CRITICAL_REDIRECTIONS_ON_EVENTS,
  REDIRECTIONS_ON_EVENTS,
  ROUTES_API,
  ROUTES_FRONT,
  ROUTES_FRONT_APP,
  ROUTES_FRONT_KEYS,
  ROUTES_FRONT_STATIC,
  ROUTES_FRONT_VALUES,
} from '../domain/routing/routing.config'
import {ROUTES_API_NAME, ROUTES_API_PATH, ROUTES_FRONT_NAME, ROUTES_FRONT_PATH} from '../domain/routing/routing.types'


export type ROUTING_POLICY_TYPE = {

  utils: {
    NORMALIZE_PATH: (path?: string | undefined) => string
    IS_EXISTS_REDIRECTION_FOR_PASSED_EVENT: (event: EVENT_INFO_TYPE | undefined | null) => boolean
    GET_ROUTE_FRONT_PATH: (routeName: ROUTES_FRONT_NAME | string | null) => ROUTES_FRONT_PATH | null
    GET_ROUTE_FRONT_NAME: (routePath: ROUTES_FRONT_PATH | string | null) => ROUTES_FRONT_NAME | null
    GET_ROUTE_API_PATH: (routeName: ROUTES_API_NAME) => ROUTES_API_PATH
    IS_THE_SAME_PATH: (redirectionRoutePath: ROUTES_FRONT_PATH, currentPathname?: ROUTES_FRONT_PATH) => boolean
    REDIRECT_BY_NEXT_ROUTER: (routePath: ROUTES_FRONT_PATH, router: NextRouter) => {
      willBeRedirect: boolean,
      redirectAction: () => Promise<boolean>
    }
    IS_APP_PATH: (requestedRoutePath?: ROUTES_FRONT_PATH | string | undefined) => boolean
    IS_STATIC_PAGE: (requestedRoutePath?: ROUTES_FRONT_PATH | string | undefined) => boolean
  }
}

export const ROUTING_POLICY: ROUTING_POLICY_TYPE = {


  utils: {
    NORMALIZE_PATH: (path) => {
      if (!path) {
        return ''
      }
      return path.endsWith('/') && path !== '/'
        ? path.slice(0, -1)
        : path
    },

    GET_ROUTE_FRONT_PATH: (routeName) => {
      return typeof routeName === 'string' ? ROUTES_FRONT[routeName as ROUTES_FRONT_NAME] : null
    },

    GET_ROUTE_FRONT_NAME: (routePath) => {
      for (let i = 0; i < ROUTES_FRONT_KEYS.length; i++) {
        const name = ROUTES_FRONT_KEYS[i]
        const path = ROUTES_FRONT_VALUES[i]
        if (routePath === path) {
          return name as ROUTES_FRONT_NAME
        }
      }
      return null
    },

    GET_ROUTE_API_PATH: (routeName) => {
      return ROUTES_API[routeName]
    },

    IS_THE_SAME_PATH: (redirectionRoutePath, currentPathname) => {
      const currentPath = ROUTING_POLICY.utils.NORMALIZE_PATH(currentPathname ? currentPathname : window.location.pathname)
      const requestedPath = ROUTING_POLICY.utils.NORMALIZE_PATH(redirectionRoutePath)
      return currentPath === requestedPath
    },

    IS_EXISTS_REDIRECTION_FOR_PASSED_EVENT: (event) => {
      return Object.keys(REDIRECTIONS_ON_EVENTS ?? {})
        .includes(event ?? '') || Object.keys(CRITICAL_REDIRECTIONS_ON_EVENTS ?? {})
        .includes(event ?? '')
    },
    REDIRECT_BY_NEXT_ROUTER: (routePath, router) => {
      const willBeRedirect = !ROUTING_POLICY.utils.IS_THE_SAME_PATH(routePath)
      const redirectAction = async () => {
        return await router.replace(routePath)
      }
      return {
        willBeRedirect,
        redirectAction,
      }
    },

    IS_APP_PATH: (requestedRoutePath) => {
      const pathToCheck = ROUTING_POLICY.utils.NORMALIZE_PATH(requestedRoutePath ? requestedRoutePath : location.pathname)
      return Boolean(Object.values(ROUTES_FRONT_APP)
        .find((path) => path === pathToCheck))
    },

    IS_STATIC_PAGE: (requestedRoutePath) => {
      const pathToCheck = ROUTING_POLICY.utils.NORMALIZE_PATH(requestedRoutePath ? requestedRoutePath : location.pathname)
      return Boolean(Object.values(ROUTES_FRONT_STATIC)
        .find((path) => path === pathToCheck))
    },

  },

} as const

import {adminTickDebugSwitch_IO, masterAdminInit_IO} from '../../domain/admin/adminActionsIO.possibilities.api'
import {redirectToAction} from '../../domain/redirections-and-routing/redirections.operations.api'
import {ROUTES_FRONT} from '../../READONLY-shared-kernel/domain/routing/routing.config'
import {reduxStore} from '../store/store'
import {cheatCodeLoader} from './cheats.controller'
import {STORE_SET_devMode_debugOnSwitch} from './dev-mode.slice'


export const MAX_CODE_LENGTH = 16

export const CHEAT_CODES = [
  'debugon',
  'debugoff',
  'backenddebug',
  'backenddbdebug',
  'masteradmininit',
  'connectioncheck'
] as const


export const initCheatsController = async () => {
  await cheatCodeLoader({

    debugon: () => {
      reduxStore.dispatch(STORE_SET_devMode_debugOnSwitch(true))
      alert('debugOnSwitch(true)')
    },

    debugoff: () => {
      reduxStore.dispatch(STORE_SET_devMode_debugOnSwitch(false))
      alert('debugOnSwitch(false)')
    },

    backenddebug: () => {
      void adminTickDebugSwitch_IO(
        undefined,
        async (response) => {
          alert(response.event)
        },
        async (error) => {
          alert('backenddebug ERROR')
        })
    },

    backenddbdebug: () => {
      void adminTickDebugSwitch_IO(
        {debug_db: true},
        async (response) => {
          alert(response.event)
        },
        async (error) => {
          alert('backenddbdebug ERROR')
        })
    },

    masteradmininit: () => {
      void masterAdminInit_IO(
        undefined,
        async (response) => {
          alert(response.event)
        },
        async (error) => {
          alert('masteradmininit ERROR')
        })
    },

    connectioncheck: () => {
      void redirectToAction({routePath: ROUTES_FRONT.CONNECTION_CHECK})
    }
  })
}

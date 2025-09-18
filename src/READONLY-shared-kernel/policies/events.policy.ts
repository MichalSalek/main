import {EVENTS} from '../domain/commands-and-queries/cqrs.config'
import {
  EVENT_COMMANDS_AND_QUERIES_TYPE,
  EVENT_COMMANDS_TYPE,
  EVENT_INFO_TYPE,
  EVENT_QUERIES_TYPE,
  EVENTS_ALL_TYPE,
  GROUP_KEY
} from '../domain/commands-and-queries/cqrs.types'
import {eventsDisallowedForUI} from "../domain/UI-events/UIEvents.config";


export type EVENTS_POLICY_TYPE = {

  eventsDisallowedForUI: Readonly<EVENT_INFO_TYPE[]>

  utils: {
    IS_EVENT_DISALLOWED_FOR_UI: (event: EVENT_INFO_TYPE | string | undefined | null) => boolean
    GET_TYPED_EVENT: (event: EVENTS_ALL_TYPE) => EVENTS_ALL_TYPE
    GET_COMMAND_AND_QUERY_EVENTS: (type?: 'commands' | 'queries' | undefined) => readonly EVENT_COMMANDS_AND_QUERIES_TYPE[]
    IS_INFO_EVENT: (event: EVENT_INFO_TYPE | string | undefined | null) => boolean
  }
}
export const EVENTS_POLICY: EVENTS_POLICY_TYPE = {

  eventsDisallowedForUI: Object.freeze(eventsDisallowedForUI),

  utils: {
    IS_EVENT_DISALLOWED_FOR_UI: (event) => {
      return !event || EVENTS_POLICY.eventsDisallowedForUI.includes(event as EVENT_INFO_TYPE)
    },
    IS_INFO_EVENT: (event) => {
      const infos = Object.keys(EVENTS.INFO)
        .map((groupKey) => EVENTS.INFO[groupKey as GROUP_KEY])
        .flat(Infinity) as EVENT_INFO_TYPE[]
      return infos.includes(event as EVENT_INFO_TYPE)
    },
    GET_TYPED_EVENT: (event) => event,
    GET_COMMAND_AND_QUERY_EVENTS: (type) => {
      const commands = Object.keys(EVENTS.COMMANDS)
        .map((groupKey) => EVENTS.COMMANDS[groupKey as GROUP_KEY])
        .flat(Infinity) as EVENT_COMMANDS_TYPE[]
      if (type === 'commands') {
        return commands
      }

      const queries = Object.keys(EVENTS.QUERIES)
        .map((groupKey) => EVENTS.QUERIES[groupKey as GROUP_KEY])
        .flat(Infinity) as EVENT_QUERIES_TYPE[]
      if (type === 'queries') {
        return queries
      }

      return (
        [...commands,
          ...queries])
    }


  } as const

} as const

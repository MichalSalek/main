import {EVENTS} from './cqrs.config'


type EVENTS_TYPES = keyof typeof EVENTS

type EVENTS_GROUPS = keyof typeof EVENTS[EVENTS_TYPES]

export type GROUP_KEY = keyof typeof EVENTS.COMMANDS & keyof typeof EVENTS.QUERIES


// GROUPED
//
export type EVENT_INFO_TYPE = typeof EVENTS['INFO'][EVENTS_GROUPS][number]

export type EVENT_COMMANDS_TYPE = typeof EVENTS['COMMANDS'][EVENTS_GROUPS][number]

export type EVENT_QUERIES_TYPE = typeof EVENTS['QUERIES'][EVENTS_GROUPS][number]


// COMMANDS AND QUERIES
//
export type EVENT_COMMANDS_AND_QUERIES_TYPE = EVENT_COMMANDS_TYPE | EVENT_QUERIES_TYPE


// ALL EVENTS
//
export type EVENTS_ALL_TYPE = typeof EVENTS[EVENTS_TYPES][EVENTS_GROUPS][number]



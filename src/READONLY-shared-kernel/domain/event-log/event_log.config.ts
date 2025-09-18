import {EventLogType, EventLogTypeValue} from "../../models/db_models";
import {EVENT_INFO_TYPE} from "../commands-and-queries/cqrs.types";


export const allowedEventLogTypes: Readonly<Record<EventLogType, EVENT_INFO_TYPE[]>> = {
  [EventLogTypeValue.LOGIN_EVENT_LOG]: [
    'USER_LOGGED_IN',
    'USER_LOGGED_OUT',
    'CANNOT_LOGIN',
    'USER_DISABLED_SELF',
    'USER_ENABLED_SELF',
    'ALL_SESSIONS_DELETED',
    'SESSION_EXPIRED',
    'SESSION_DELETED',
    'USER_BECAME_SOMEONE_ELSE',
    'USER_SWITCHED_BACK_TO_SELF'],
  [EventLogTypeValue.ACCOUNT_EVENT_LOG]: [
    'PAYMENT_DONE',
    'ACCOUNT_CREATED',
    'DISPLAY_NAME_CHANGED',
    'USER_DISABLED',
    'USER_ENABLED',
    'USER_DELETED',
    'USER_CREATED',
    'USER_REGISTERED',
    'PRICING_PLAN_CHANGED']
} as const

export const allowedEventLogTypesValues = Object.values(allowedEventLogTypes).flat()

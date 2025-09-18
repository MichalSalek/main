import {FULL_DATE_FORMAT, TIME_ONLY_FORMAT} from './date/date.config'
import {
  DateApplication,
  dateApplication,
  dateIsSameDayThanNow
} from '../../READONLY-shared-kernel/application/date/dayjs-adapter/date.adapter'
import {UserMetadata} from '../../READONLY-shared-kernel/models/user/user.types'


export const getUserAgentForUI = (userAgent: UserMetadata['user_agent'] | null): UserMetadata['user_agent'] => {

  return userAgent ?? undefined
}


export const getDateForUI = (date?: string | Date | DateApplication | null | undefined): string => {

  if (typeof date === 'undefined' || date === null) {
    return 'DATE_NOT_SET'
  }
  const dayjsFormatDate = dateApplication(date)

  if (dateIsSameDayThanNow(dayjsFormatDate.add(
    1,
    'day'))) {
    return 'Wczoraj, ' + dateApplication(date)
      .format(TIME_ONLY_FORMAT)
  }

  if (dateIsSameDayThanNow(dayjsFormatDate)) {
    return 'Dzisiaj, ' + dateApplication(date)
      .format(TIME_ONLY_FORMAT)
  }


  if (dateIsSameDayThanNow(dayjsFormatDate.subtract(
    1,
    'day'))) {
    return 'Jutro, ' + dateApplication(date)
      .format(TIME_ONLY_FORMAT)
  }

  return dateApplication(date)
    .format(FULL_DATE_FORMAT)
}



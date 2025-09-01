import {FULL_DATE_FORMAT_FOR_UI, TIME_ONLY_FORMAT_FOR_UI} from '../../application/date/date.config'
import {
  DateApplication,
  dateApplication,
  dateIsSameDayThanNow
} from '../../READONLY-shared-kernel/application/date/dayjs-adapter/date.adapter'
import {UserMetadata} from '../../READONLY-shared-kernel/models/user/user.types'


export const userAgentForUI = (userAgent: UserMetadata['user_agent'] | null): UserMetadata['user_agent'] => {

  return userAgent ?? undefined
}


export const dateForUI = (date?: string | Date | DateApplication | null | undefined): string => {

  if (typeof date === 'undefined' || date === null) {
    return 'DATE_NOT_SET'
  }
  const dayjsFormatDate = dateApplication(date)

  if (dateIsSameDayThanNow(dayjsFormatDate.add(
    1,
    'day'))) {
    return 'Wczoraj, ' + dateApplication(date)
      .format(TIME_ONLY_FORMAT_FOR_UI)
  }

  if (dateIsSameDayThanNow(dayjsFormatDate)) {
    return 'Dzisiaj, ' + dateApplication(date)
      .format(TIME_ONLY_FORMAT_FOR_UI)
  }


  if (dateIsSameDayThanNow(dayjsFormatDate.subtract(
    1,
    'day'))) {
    return 'Jutro, ' + dateApplication(date)
      .format(TIME_ONLY_FORMAT_FOR_UI)
  }

  return dateApplication(date)
    .format(FULL_DATE_FORMAT_FOR_UI)
}



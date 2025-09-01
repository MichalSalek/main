// @ts-ignore
import dayjs          from 'dayjs'
// https://day.js.org/docs/en/query/is-same
// @ts-ignore
import isSameOrAfter  from 'dayjs/plugin/isSameOrAfter'
// @ts-ignore
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
// @ts-ignore
import utc            from 'dayjs/plugin/utc'




dayjs.extend(utc)
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)

export type DateApplication = dayjs.Dayjs

export const dateApplication = (date?: dayjs.ConfigType): DateApplication => dayjs(date)


export const nowDateIsSameOrAfterThanPassed = (dateToCompare: DateApplication, fromDate?: DateApplication): boolean => {
  return dayjs(fromDate)
    .isSameOrAfter(dateToCompare)
}


export const nowDateIsSameOrBeforeThanPassed = (dateToCompare: DateApplication, fromDate?: DateApplication): boolean => {
  return dayjs(fromDate)
    .isSameOrBefore(dateToCompare)
}


export const dateIsSameDayThanNow = (date: DateApplication): boolean => {
  return dayjs()
    .isSame(
      date,
      'day')
}


export const getNowInUTCString = () => {
  return dayjs()
    .utc()
    .format()
}

export const getDateInUTCString = (date: Date | dayjs.ConfigType) => {
  return dayjs(date)
    .utc()
    .format()
}

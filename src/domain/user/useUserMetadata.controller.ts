import {interactionFunctionCall} from '@msalek/utils'
import Router from 'next/router'
import {useEffect, useRef} from 'react'
import {__debuggerGate} from '../../application/error-debugger/debugger.utils.api'
import {useAppDispatch, useAppSelector} from '../../application/store/store'
import {
  dateApplication,
  DateApplication,
  nowDateIsSameOrBeforeThanPassed
} from '../../READONLY-shared-kernel/application/date/dayjs-adapter/date.adapter'
import {STORE_SEL_user_currentUser} from './user.read'
import {STORE_SET_user_userMetadata} from './user.slice'
import {getUserMetadata} from './user.utils.api'


const TIME_GAP_BETWEEN_CHECKS_IN_SECONDS = 900

export const useUserMetadataController = () => {
  const currentUser = useAppSelector(STORE_SEL_user_currentUser)
  const dispatch = useAppDispatch()

  const nextCheck = useRef<DateApplication>(dateApplication())

  useEffect(
    () => {
      void currentUser

      const updateUserMetadataOnInteraction = async () => {

        if (nowDateIsSameOrBeforeThanPassed(nextCheck.current)) {
          return void undefined
        }
        nextCheck.current = dateApplication()
          .add(
            TIME_GAP_BETWEEN_CHECKS_IN_SECONDS,
            'second')

        interactionFunctionCall(async () => {
          __debuggerGate(() => {
            console.log('updateUserMetadataOnInteraction ' + Date.now())
          })
          dispatch(STORE_SET_user_userMetadata(await getUserMetadata()))
        })
      }

      void updateUserMetadataOnInteraction()


      Router.events.on(
        'routeChangeComplete',
        updateUserMetadataOnInteraction)

      return () => {
        Router.events.off(
          'routeChangeComplete',
          updateUserMetadataOnInteraction)
      }

    },
    [currentUser,
      dispatch])

}

import {useEffect, useRef} from 'react'
import {useAppDispatch, useAppSelector} from '../../application/store/store'
import {sessionGetCurrent_IO} from '../session-actions/sessionIO.operations.api'
import {STORE_SEL_user_currentUser} from './user.read'


export const useInitCurrentUserController = (): void => {
  const dispatch = useAppDispatch()

  const currentUser = useAppSelector(STORE_SEL_user_currentUser)

  const fireOnce = useRef(false)

  useEffect(
    () => {
      if (typeof currentUser !== 'undefined') {
        return void undefined
      }

      if (fireOnce.current) {
        return void undefined
      }

      fireOnce.current = true

      void sessionGetCurrent_IO(
        undefined,
        async (response) => {
        },
        async (error) => {
        })

      return () => {

      }

    },
    [currentUser, dispatch])

}


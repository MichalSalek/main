import {Button, Stack} from "@mui/material";
import {getDateForUI, getUserAgentForUI} from "../../../features/UI.utils.api";
import {useAppSelector} from "../../../../application/store/store";
import {STORE_SEL_user_currentUser} from "../../../../domain/user/user.read";
import {useLogoutUserHook} from "../../../application-hooks/useLogoutUser.hook";
import {useCallback, useState} from "react";
import {EventLog, EventLogTypeValue, Session} from "../../../../READONLY-shared-kernel/models/db_models";
import {
  deleteSessionAll_IO,
  deleteSessionExactly_IO,
  getAllSessions_IO
} from "../../../../domain/session-actions/sessionIO.possibilities.api";
import {getEventLogs_IO} from "../../../../domain/event-log-actions/eventLogIO.possibilities.api";
import {useFireOnMountHook} from "@msalek/utils";

export const LoggedDevicesMolecule = () => {
  const currentUser = useAppSelector(STORE_SEL_user_currentUser)

  const {logoutButtonLoadingState, logoutUserCallback} = useLogoutUserHook()

  const [sessions, setSessions] = useState<Session[]>([])
  const [loginEventLogs, setLoginEventLogs] = useState<EventLog[]>([])

  const getAndUpdateSessions = useCallback(
    () => {
      void getAllSessions_IO(
        undefined,
        async (response) => {
          setSessions(response.data)
        },
        async (error) => {

        })
    },
    [])


  const deleteSessionExactlyCallback = useCallback(
    async (session_id: Session['session_id']) => {
      await deleteSessionExactly_IO(
        {session_id},
        async (response) => {

        },
        async (error) => {

        })
      getAndUpdateSessions()
    },
    [getAndUpdateSessions])


  const deleteSessionsAllCallback = useCallback(
    async () => {
      await deleteSessionAll_IO(
        undefined,
        async (response) => {

        },
        async (error) => {

        })
      getAndUpdateSessions()
    },
    [getAndUpdateSessions])


  const getEventLogsCallback = useCallback(
    () => {
      void getEventLogs_IO(
        {type: EventLogTypeValue.LOGIN_EVENT_LOG},
        async (response) => {
          setLoginEventLogs(response.data)
        },
        async (error) => {
          console.log(error)
        })
    },
    [])


  useFireOnMountHook(() => {
    getAndUpdateSessions()
    getEventLogsCallback()
  })


  return <Stack>

    <b>Lista zalogowanych urządzeń:</b>
    <br/>
    <ol>

      <li>
        <span><span style={{color: 'green'}}>Twoja sesja</span></span><br/>
        <span> Ostatnia wykryta aktywność na koncie - {getDateForUI(currentUser?.session.last_used)}</span><br/>
        <span> Kiedy nastąpiło zalogowanie - {getDateForUI(currentUser?.session.created_at)}</span><br/>
        <span> Kiedy wygasa - {getDateForUI(currentUser?.session.expires_at)}</span><br/>
        <span> Tryb sesji - {currentUser?.session.session_mode}</span><br/>
        <span> Kraj i język - {currentUser?.session.location} {currentUser?.session.language}</span><br/>
        <span>{getUserAgentForUI(currentUser?.session.user_agent)}</span><br/>
        <span>ID - {currentUser?.session.session_id}</span><br/>

        <br/>
      </li>


      {sessions.map((el) => {

        if (el.session_id === currentUser?.session.session_id) {
          return undefined
        }

        return <li key={getDateForUI(el.created_at)}>
          <span><span style={{color: 'green'}}>Zalogowany</span></span><br/>
          <span> Ostatnia wykryta aktywność na koncie - {getDateForUI(el.last_used)}</span><br/>
          <span> Kiedy nastąpiło zalogowanie - {getDateForUI(el.created_at)}</span><br/>
          <span> Kiedy wygasa - {getDateForUI(el.expires_at)}</span><br/>
          <span> Tryb sesji - {el.session_mode}</span><br/>
          <span> Kraj i język - {el.location} {el.language}</span><br/>
          <span>{getUserAgentForUI(el.user_agent)}</span><br/>
          <span>ID - {el.session_id}</span><br/>
          <Button variant={'outlined'}
                  onClick={() => deleteSessionExactlyCallback(el.session_id)}>Wyloguj</Button>
          <br/>
        </li>
      })}
    </ol>


    <Button variant={'outlined'} onClick={logoutUserCallback} loading={logoutButtonLoadingState}>Wyloguj
      się</Button>

    <Button type={'button'} onClick={deleteSessionsAllCallback}>WYLOGUJ WSZYSTKICH</Button>


    <br/>

    <b>Historia logowań:</b>
    <br/>
    <ol style={{
      overflow: 'auto',
      maxHeight: '200px',
      width: 'fit-content'
    }}>
      {loginEventLogs.map((el) => <li
        key={getDateForUI(el.created_at) + el.event_log_id}>
        <span>{getDateForUI(el.created_at)} </span>
        <span>{el.event}</span><br/>
      </li>)}
    </ol>
    <br/>
    <br/>

  </Stack>
}
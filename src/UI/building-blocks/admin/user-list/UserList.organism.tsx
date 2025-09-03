import {freezeThreadAndWait, useFireOnMountHook} from '@msalek/utils'
import {Button, Stack} from '@mui/material'
import {ReactElement, startTransition, useCallback, useMemo, useRef, useState} from 'react'
import {getAndUpdateAppUsersList_IO} from '../../../../domain/user/userIO.operations.api'
import UserRecordMolecule from "./UserRecord.molecule";
import {useAdminContext} from "../../../../domain/admin/useAdminContext.hook";
import {AdminContext} from "../../../../domain/admin/admin.context";
import {FiltersContainer} from "./user-list-filters/Filters.container";
import CircularProgress from "@mui/material/CircularProgress";


export const UserListOrganism = (): ReactElement => {
  const [updateDisabledState, setUpdateDisabledState] = useState<boolean>(false)
  const [updateLoadingState, setUpdateLoadingState] = useState<boolean>(false)

  const AdminContextValue = useAdminContext()

  const {
    appUsers,
    setAppUsers
  } = AdminContextValue

  const updateUserListCallback = useCallback(
    async () => {

      setUpdateDisabledState(true)
      setUpdateLoadingState(true)

      await getAndUpdateAppUsersList_IO(
        undefined,
        async (response) => {
          startTransition(() => {
            setAppUsers(response.data)
          })
        },
        async (error) => {
        })


      await freezeThreadAndWait(300)
      setUpdateLoadingState(false)
      setUpdateDisabledState(false)
    },
    [setAppUsers])


  useFireOnMountHook(updateUserListCallback)


  const usersListRef = useRef<HTMLOListElement>(null)

  const renderRecords = useMemo(
    () => {
      return appUsers.length === 0 ? <CircularProgress sx={{margin: 'auto'}}/> : appUsers.map((user) =>
        <UserRecordMolecule
          id={user.user_id}
          key={user.user_id}
          user={user}/>)
    },
    [appUsers])


  return (
    <AdminContext.Provider value={AdminContextValue}>

      <Button
        variant={'outlined'}
        loading={updateLoadingState}
        disabled={updateDisabledState}
        onClick={updateUserListCallback}>
        Update list now</Button>

      <FiltersContainer usersListRef={usersListRef}/>

      <Stack
        component={'ol'}
        ref={usersListRef}
        sx={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 1
        }}>

        {renderRecords}

      </Stack>

    </AdminContext.Provider>)
}

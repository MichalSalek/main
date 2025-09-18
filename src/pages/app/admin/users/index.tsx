import {Typography} from '@mui/material'
import {UserListOrganism} from "../../../../UI/building-blocks/admin/user-list/UserList.organism";


export default function Index() {


  return (<>
    <Typography variant={'h1'}>
      Użytkownicy
    </Typography>

    <UserListOrganism/>
  </>)
}



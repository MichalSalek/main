import {Avatar, Button, List, ListItem, ListItemAvatar, Stack, TextField, Typography} from '@mui/material'
import {useCallback, useState} from 'react'
import {redirectToByEvent} from '../../../../domain/redirections-and-routing/redirections.operations.api'
import {disableUserSelf_IO} from '../../../../domain/user/userIO.possibilities.api'
import {DeleteUserSelfAtom} from '../../../../UI/building-blocks/account-and-user-operations/DeleteUserSelf.atom'


export default function Delete() {

  const [password, setPassword] = useState<string>('123123')


  const deactivateAccountCallback = useCallback(
    async () => {
      await disableUserSelf_IO(
        {password: '123123'},
        async (response) => {
          await redirectToByEvent(response.event)
        },
        async (error) => {
        })
    },
    [])


  return (
    <>

      <Typography variant={'h1'}>
        Dezaktywacja lub usunięcie konta
      </Typography>

      <List sx={{
        maxWidth: '500px'
      }}>

        <ListItem>
          <ListItemAvatar>
            <Avatar>
              1
            </Avatar>
          </ListItemAvatar>

          <Stack>

            <Typography variant="subtitle1">Podaj swoje hasło w celach bezpieczeństwa</Typography>

            <TextField label={'Hasło'} name="password" defaultValue={'123123'} disabled={true}></TextField>

          </Stack>

        </ListItem>

        <ListItem>
          <ListItemAvatar>
            <Avatar>
              2
            </Avatar>
          </ListItemAvatar>

          <Stack>

            <Typography variant="subtitle1">Wybierz, co chcesz zrobić</Typography>

            <Button type={'button'} onClick={deactivateAccountCallback}>
              Wstrzymaj subskrypcję
            </Button>

            <DeleteUserSelfAtom req={{password}}/>

          </Stack>

        </ListItem>
      </List>

    </>)
}


export async function getStaticProps() {
  return {
    props: {}
  }
}


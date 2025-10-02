import {Box, ButtonGroup, Paper, Stack, Typography} from '@mui/material'
import {useAppSelector} from '../application/store/store'
import {STORE_SEL_user_currentUser} from '../domain/user/user.read'
import {ROUTES_FRONT} from '../READONLY-shared-kernel/domain/routing/routing.config'
import {LinkAtom} from '../UI/building-blocks/_wide-use-components/Link.atom'
import {STYLES_POLICY} from '../UI/styles/styles.policy';


export default function Home() {

  const currentUser = useAppSelector(STORE_SEL_user_currentUser)

  return (
    <Box sx={{
      padding: STYLES_POLICY.spacing[3]
    }}>

      <Typography variant={'h1'}>
        Portfolio usług kosmetycznych
      </Typography>

      <Paper
        variant="outlined"
        sx={{
          minWidth: '100%',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          paddingY: 5,
          gap: 5
        }}>

        <Typography variant={'h2'}>
          Zacznij korzystać
        </Typography>

        <Stack flexDirection={'row'} gap={'20px'}>
          {currentUser
            ? <LinkAtom route={ROUTES_FRONT.APP}>
              <Typography variant={'caption'}>TO THE APP</Typography>
            </LinkAtom>
            : <ButtonGroup variant='text'>
              <LinkAtom route={ROUTES_FRONT.USER_REG}>
                <Typography variant={'caption'}>Stwórz nowe konto</Typography>
              </LinkAtom>
              <LinkAtom route={ROUTES_FRONT.USER_LOG}>
                <Typography variant={'caption'}>Zaloguj się</Typography>
              </LinkAtom>
            </ButtonGroup>}
        </Stack>

      </Paper>

      <br/> <br/>

      {currentUser
        ? null
        : <Paper
          variant="outlined"
          sx={{
            minWidth: '100%',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            paddingY: 5,
            gap: 5
          }}>

          <Typography variant={'h2'}>
            Uzyskaj swój dostęp
          </Typography>

          <Stack flexDirection={'row'} gap={'20px'}>

            <LinkAtom route={ROUTES_FRONT.PRICING}>Przegląd planów</LinkAtom>

          </Stack>

        </Paper>}


    </Box>)
}


export async function getStaticProps() {
  return {
    props: {}
  }
}

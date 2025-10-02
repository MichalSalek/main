import {freezeThreadAndWait} from '@msalek/utils'
import {Box, Button, Stack, TextField, Typography} from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import {FormEvent, ReactNode, useCallback, useEffect, useMemo, useState} from 'react'
import {DataPassedBetweenViewsConfig} from '../../../application/data-between-views/dataBetweenViews.config'
import {redirectToAction} from '../../../domain/redirections-and-routing/redirections.operations.api'
import {registerUser_IO} from '../../../domain/user/userIO.possibilities.api'
import {ROUTES_FRONT} from '../../../READONLY-shared-kernel/domain/routing/routing.config'
import {User} from '../../../READONLY-shared-kernel/models/db_models'
import {EmailInputAtom} from '../../../UI/building-blocks/_wide-use-components/EmailInput.atom'
import {VALIDATION_POLICY} from '../../../READONLY-shared-kernel/policies/validation.policy';
import {
  deleteFromClientStorage,
  getFromClientStorage
} from '../../../application/client-device-storage/clientStorage.possibilities.api';
import {STYLES_POLICY} from '../../../UI/styles/styles.policy';


export default function Register() {


  const getButtonContent = useCallback(
    (variant: 'submit' | 'wait') => {
      if (variant === 'submit') {
        return <>Otwórz konto</>
      }
      if (variant === 'wait') {
        return <>Tworzenie przestrzeni... <CircularProgress sx={{mx: 3}} thickness={1} disableShrink={true}
                                                            size={18}/></>
      }
    },
    [])

  const [buttonContent, setButtonContent] = useState<ReactNode>(getButtonContent('submit'))
  const [buttonDisabledState, setButtonDisabledState] = useState(false)


  const email = useMemo<User['email']>(
    () => getFromClientStorage({key: DataPassedBetweenViewsConfig.KEYS.EMAIL}) ?? '',
    [])


  const backCallback = useCallback(
    async () => {
      await redirectToAction({routePath: ROUTES_FRONT.USER_REG})
    },
    [])


  useEffect(
    () => {
      if (!email) {
        void backCallback()
      }
    },
    [email,
      backCallback])


  const formSubmitCallback = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      setButtonDisabledState(true)
      setButtonContent(getButtonContent('wait'))
      const formData = new FormData(event.currentTarget)

      const password = VALIDATION_POLICY.utils.normalizeStringEliminateWhitespaces(formData.get('password') as string)

      const payload = {
        email,
        password
      }
      await registerUser_IO(
        payload,
        async (res) => {
          deleteFromClientStorage({key: DataPassedBetweenViewsConfig.KEYS.EMAIL})
          if (getFromClientStorage({key: DataPassedBetweenViewsConfig.KEYS.PRICING_PLAN})) {
            await redirectToAction({routePath: ROUTES_FRONT.USER_ACCOUNT_PAY})
          } else {
            await redirectToAction({routePath: ROUTES_FRONT.APP})
          }

        },
        async (error) => {
          await freezeThreadAndWait(500)
          setButtonDisabledState(false)
          setButtonContent(getButtonContent('submit'))
        })
    },
    [getButtonContent,
      email])


  return (
    <Box sx={{
      padding: STYLES_POLICY.spacing[3]
    }}>

      <Stack sx={{py: 3}}>


        <Stack component={'form'} onSubmit={formSubmitCallback}>
          <Typography variant={'h1'}>
            Ustaw bezpieczne hasło
          </Typography>

          <EmailInputAtom readOnly={true}></EmailInputAtom>
          <TextField autoFocus={true} label={'Otrzymany kod weryfikacyjny'} name="code"
                     defaultValue={453251}></TextField>
          <TextField label={'Ustaw bezpieczne hasło'} name="password" defaultValue={'123123'}></TextField>
          <Button type={'submit'} disabled={buttonDisabledState}>
            {buttonContent}
          </Button>
          <Button variant={'outlined'} type={'button'} onClick={backCallback}>
            Popraw dane
          </Button>
        </Stack>

      </Stack>

    </Box>)
}


export async function getStaticProps() {
  return {
    props: {}
  }
}


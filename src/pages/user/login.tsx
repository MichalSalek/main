import {Button, Stack, TextField, Typography} from '@mui/material'
import {FormEvent, startTransition, useCallback, useEffect, useState} from 'react'
import {DataPassedBetweenViewsConfig} from '../../application/data-between-views/dataBetweenViews.config'
import {redirectToAction} from '../../domain/redirections-and-routing/redirections.operations.api'
import {loginUser_IO} from '../../domain/user/userIO.possibilities.api'
import {ROUTES_FRONT} from '../../READONLY-shared-kernel/domain/routing/routing.config'
import {EmailInputAtom} from '../../UI/building-blocks/_wide-use-components/EmailInput.atom'
import {ConditionalButtonAtom} from "../../UI/building-blocks/_wide-use-components/ConditionalButton.atom";
import {VALIDATION_POLICY} from "../../READONLY-shared-kernel/policies/validation.policy";
import {setToClientStorage} from "../../application/client-device-storage/clientStorage.possibilities.api";
import {MASTER_ADMIN_EMAIL} from "../../READONLY-shared-kernel/domain/admin/admin.config";


export default function Login() {

  const [loginButtonDisabledState, setLoginButtonDisabledState] = useState<boolean>(false)

  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('123123')

  const [registerNewAccountSection, setRegisterNewAccountSection] = useState(false)

  useEffect(
    () => {
      if (emailValue) {
        setRegisterNewAccountSection(false)
      }
    },
    [emailValue])

  const formSubmitCallback = useCallback(
    async (event?: FormEvent<HTMLFormElement> | undefined) => {
      event?.preventDefault()

      setLoginButtonDisabledState(true)
      void loginUser_IO(
        {
          email: VALIDATION_POLICY.utils.normalizeStringEliminateWhitespaces(emailValue),
          password: VALIDATION_POLICY.utils.normalizeStringEliminateWhitespaces(passwordValue)
        },
        async (response) => {

        },
        async (error) => {
          setLoginButtonDisabledState(false)
          if (error.event === 'USER_NOT_FOUND') {
            setRegisterNewAccountSection(true)
          }
        })
    },
    [emailValue, passwordValue])


  const TEMP_adminLogin = () => {
    setEmailValue(MASTER_ADMIN_EMAIL)
    setPasswordValue('123123')
  }

  useEffect(() => {
    if (emailValue === MASTER_ADMIN_EMAIL) {
      startTransition(() => {
        requestAnimationFrame(() => {
          void formSubmitCallback()
        })
      })
    }
  }, [formSubmitCallback, emailValue])


  const createAccountCallback = useCallback(
    async () => {
      setToClientStorage({
        key: DataPassedBetweenViewsConfig.KEYS.EMAIL,
        value: emailValue,
        sessionOnly: true
      })
      await redirectToAction({routePath: ROUTES_FRONT.USER_REG})
    },
    [emailValue])

  return (
    <>

      <Typography variant={'h1'}>
        Zaloguj się do aplikacji i wykorzystaj potencjał swoich usług.
      </Typography>


      <Stack
        component={'form'}
        onSubmit={formSubmitCallback}
        sx={{
          py: 3,
          alignItems: 'center'
        }}
      >
        <EmailInputAtom
          value={emailValue}
          setValue={setEmailValue}
        />
        <TextField
          label={'Podaj hasło'}
          value={passwordValue}
          onChange={(e) => setPasswordValue(e.target.value)}></TextField>

        <Button type={'submit'} loading={loginButtonDisabledState}>
          Zaloguj się
        </Button>
      </Stack>


      <ConditionalButtonAtom
        condition={registerNewAccountSection}
        informationText={'Takie konto nie istnieje. Chcesz je założyć?'}
        buttonActionCallback={createAccountCallback}
        buttonText={'CREATE ACCOUNT'}
      />


      <Button variant={'outlined'} color={'warning'} size={'small'} loading={loginButtonDisabledState}
              onClick={TEMP_adminLogin}>
        Zaloguj demo admina
      </Button>

    </>)
}


export async function getStaticProps() {
  return {
    props: {}
  }
}


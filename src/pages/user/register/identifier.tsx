import {freezeThreadAndWait} from '@msalek/utils'
import {Button, Stack, Typography} from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import {FormEvent, ReactNode, useCallback, useEffect, useState} from 'react'
import {DataPassedBetweenViewsConfig} from '../../../application/data-between-views/dataBetweenViews.config'
import {redirectToAction} from '../../../domain/redirections-and-routing/redirections.operations.api'
import {checkIfNotEmailExists_IO} from '../../../domain/user/userIO.possibilities.api'
import {ROUTES_FRONT} from '../../../READONLY-shared-kernel/domain/routing/routing.config'
import {EmailInputAtom} from '../../../UI/building-blocks/_wide-use-components/EmailInput.atom'
import {ConditionalButtonAtom} from '../../../UI/building-blocks/_wide-use-components/ConditionalButton.atom';
import {VALIDATION_POLICY} from '../../../READONLY-shared-kernel/policies/validation.policy';
import {setToClientStorage} from '../../../application/client-device-storage/clientStorage.possibilities.api';


export default function Register() {

  const [emailForm, setEmailForm] = useState('')

  const getButtonContent = useCallback(
    (variant: 'go' | 'code-sending') => {
      if (variant === 'go') {
        return <>IDŹ DALEJ</>
      }
      if (variant === 'code-sending') {
        return <>Wysyłanie jednorazowego kodu... <CircularProgress sx={{mx: 3}} thickness={1} disableShrink={true}
                                                                   size={18}/></>
      }
    },
    [])

  const [buttonContent, setButtonContent] = useState<ReactNode>(getButtonContent('go'))
  const [buttonDisabledState, setButtonDisabledState] = useState(true)
  const [buttonLoadingState, setButtonLoadingState] = useState(false)

  const registerAccountCallback = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const email = VALIDATION_POLICY.utils.normalizeStringEliminateWhitespaces(emailForm)

      setButtonLoadingState(true)
      setButtonDisabledState(true)

      await checkIfNotEmailExists_IO(
        {email},

        async (res) => {
          setButtonLoadingState(false)

          setButtonContent(getButtonContent('code-sending'))
          await freezeThreadAndWait(300)
          setToClientStorage({
            key: DataPassedBetweenViewsConfig.KEYS.EMAIL,
            value: emailForm,
            sessionOnly: true
          })
          await redirectToAction({routePath: ROUTES_FRONT.USER_REG_PASS})
        },
        async (error) => {
          setButtonLoadingState(false)
          setButtonDisabledState(false)
          if (error.event === 'USER_ALREADY_EXISTS') {
            setRegisterNewAccountSection(true)
          }
        })
    },
    [emailForm,
      getButtonContent])


  useEffect(
    () => {
      if (emailForm.length > 7) {
        setButtonDisabledState(false)
      } else {
        setButtonDisabledState(true)
      }
    },
    [emailForm])


  const [registerNewAccountSection, setRegisterNewAccountSection] = useState(false)

  useEffect(
    () => {
      if (emailForm) {
        setRegisterNewAccountSection(false)
      }
    },
    [emailForm])

  const loginCallback = useCallback(
    async () => {
      setToClientStorage({
        key: DataPassedBetweenViewsConfig.KEYS.EMAIL,
        value: emailForm,
        sessionOnly: true
      })
      await redirectToAction({routePath: ROUTES_FRONT.USER_LOG})
    },
    [emailForm])

  return (
    <>

      <Stack sx={{py: 3}}>


        <Stack component={'form'} onSubmit={registerAccountCallback}>
          <Typography variant={'h1'}>
            Utwórz bezpłatne konto.
          </Typography>
          <Typography variant={'body1'}>
            Płatność nie będzie jeszcze wymagana.
          </Typography>
          <Typography variant={'body1'}>
            Będziesz nadal mieć możliwość wyboru planu płatności.
          </Typography>

          <EmailInputAtom
            value={emailForm}
            setValue={setEmailForm}
          />

          <Button type={'submit'} disabled={buttonDisabledState} loading={buttonLoadingState}>
            {buttonContent}
          </Button>


          <ConditionalButtonAtom
            condition={registerNewAccountSection}
            informationText={'Takie konto już istnieje. Chcesz się zalogować?'}
            buttonActionCallback={loginCallback}
            buttonText={'ZALOGUJ SIĘ'}
          />

        </Stack>


      </Stack>

    </>)
}


export async function getStaticProps() {
  return {
    props: {}
  }
}


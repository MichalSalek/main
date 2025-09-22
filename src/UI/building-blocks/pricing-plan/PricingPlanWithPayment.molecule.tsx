import {Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, Typography} from '@mui/material'
import {ReactElement, useCallback, useEffect, useMemo, useState} from 'react'
import {useAppSelector} from '../../../application/store/store'
import {makePayment_IO} from '../../../domain/account/accountIO.possibilities.api'
import {redirectToAction} from '../../../domain/redirections-and-routing/redirections.operations.api'
import {STORE_SEL_user_currentUser} from '../../../domain/user/user.read'
import {ROUTES_FRONT_APP} from '../../../READONLY-shared-kernel/domain/routing/routing.config'
import {PRICING_POLICY} from '../../../READONLY-shared-kernel/policies/pricing.policy'
import {USER_POLICY} from '../../../READONLY-shared-kernel/policies/user.policy'
import {getPricingPlanUI} from './pricingPlanUI.api'
import {usePricingPlanData} from './usePricingPlanData.hook'
import {DataPassedBetweenViewsConfig} from '../../../application/data-between-views/dataBetweenViews.config';
import {deleteFromClientStorage} from '../../../application/client-device-storage/clientStorage.possibilities.api';
import {useFireOnMountHook} from '@msalek/utils';


export const PricingPlanWithPaymentMolecule = (): ReactElement => {
  const currentUser = useAppSelector(STORE_SEL_user_currentUser)

  const {
    pricingType,
    pricingValue,
    setPricingType,
    setPricingValue,
    handleFormValueChange,
    pricingValueStorageState
  } = usePricingPlanData()


  const [loadingState, setLoadingState] = useState<boolean>(true)

  useEffect(
    () => {
      setTimeout(
        () => setLoadingState(false),
        1000)
    },
    [])


  const [summaryVariant, setSummaryVariant] = useState<boolean>(false)

  const turnOnSummary = useCallback(
    () => {
      setSummaryVariant(true)
    },
    [])

  const turnOffSummary = useCallback(
    () => {
      setSummaryVariant(false)
    },
    [])


  useFireOnMountHook(() => {
    if (pricingValueStorageState) {
      turnOnSummary()
    }
  })


  const END_FIRST_STEP_CALLBACK = useCallback(
    () => {
      if (USER_POLICY.utils.IS_USER_HAS_ACTIVE_ACCOUNT(currentUser)) {
        //@TODO ZMIANA PRICING PLANU W TRAKCIE TRWANIA INNEGO CASE
        //@todo jeśli ma opłacone konto (currentUser.pricing.payment_status === PaymentStatusValue.PAID)
        //@todo wtedy pozwala zmienić plan ze skutkiem na koniec miesiąca.
      }

      turnOnSummary()

    },
    [currentUser,
      turnOnSummary])

  const PAY_CALLBACK = useCallback(
    () => {
      setLoadingState(true)
      // Tutaj call do backu, back strzela do pricingu.
      // W razie niepowodzenia - zmiana kontentu buttona na PONÓW PŁATNOŚĆ
      // w razie powodzenia - back przesyła current usera z hasAccount: true i przekierowanie na get-started.
      setTimeout(
        async () => { //@MOCK

          //@TODO jeśli pomyślna płatność -> redirect na specjalną stronę, która jest dostępna tylko dla:
          // - zalogowanych
          // - has_account === false
          // - payment_status === PAID
          // i tam będzie wywołanie await createAccount({display_name: '' })
          // Stronka będzie wyglądała tak, żeby podać nazwę konta i kliknąć Otwórz konto i zacznij korzystać
          //
          // await createAccount({
          //   display_name: currentUser.email
          // })

          if (!pricingValue) {
            console.error('nie wybrano pricing planu')
            return undefined
          }
          await makePayment_IO(
            {
              payment_id: 666,
              pricing_plan: pricingValue
            },
            async (response) => {
              deleteFromClientStorage({key: DataPassedBetweenViewsConfig.KEYS.PRICING_PLAN})
              await redirectToAction({routePath: ROUTES_FRONT_APP.USER_ACCOUNT})
            },
            async (error) => {
            })
          setLoadingState(false)

        },
        2000)
    },
    [pricingValue])

  const CTAButtonDynamicVariant = useMemo(
    () => {
      if (summaryVariant) {
        return <Stack>
          <Button disabled={loadingState} onClick={turnOffSummary} variant={'outlined'}>Inny</Button>
          <Button loading={loadingState}
                  onClick={PAY_CALLBACK}
          > Płacę i zaczynam </Button>
        </Stack>
      } else {
        return <Button loading={loadingState}
                       onClick={END_FIRST_STEP_CALLBACK}
        > {'Podsumowanie'} </Button>
      }
    },
    [PAY_CALLBACK,
      END_FIRST_STEP_CALLBACK,
      summaryVariant,
      turnOffSummary, loadingState])


  return <FormControl sx={{
    minHeight: '300px'
  }}>
    <FormLabel id="pricing-plan"><Typography variant={'body1'}><strong>Select best pricing
      plan</strong></Typography></FormLabel>

    <Stack sx={{
      flex: 1,
      justifyContent: 'space-between'
    }}>

      {summaryVariant
        ? <>

          <Stack sx={{
            paddingTop: 2
          }}>
            <Typography variant={'body2'}><strong>Podsumowanie</strong></Typography>
            <Typography variant={'h3'}>Wybrany został
              plan: <strong>{getPricingPlanUI(pricingValue)}</strong></Typography>
            <Typography variant={'h3'}>Częstotliwość płatności: <strong>{pricingType}</strong></Typography>
            {pricingType === 'annual' && <Typography color={'green'} variant={'h3'}>Skorzystano ze
                zniżki <strong>{PRICING_POLICY.utils.GET_ANNUAL_DISCOUNT_PERCENTAGE()}</strong></Typography>}
          </Stack>

          {CTAButtonDynamicVariant}

        </>
        : <>

          <Stack sx={{
            gap: '5px',
            flexDirection: 'row'
          }}>
            <Button variant={pricingType === 'monthly'
              ? 'contained'
              : 'outlined'} onClick={() => setPricingType('monthly')}>Monthly</Button>
            <Button variant={pricingType === 'annual'
              ? 'contained'
              : 'outlined'} onClick={() => setPricingType('annual')}>Annually</Button>
          </Stack>

          <Typography variant={'h3'} marginY={1}>Wybrany okres płatności: <strong>{pricingType}</strong> <br/>
            <Typography component={'span'} color={'green'}>{pricingType
              === 'annual'
              && ` (${PRICING_POLICY.utils.GET_ANNUAL_DISCOUNT_PERCENTAGE()} w skali roku)`}</Typography></Typography>

          {pricingType === 'monthly'
            ? <RadioGroup
              aria-labelledby="pricing-monthly"
              value={pricingValue}
              onChange={handleFormValueChange}
            >
              <FormControlLabel value={1} control={<Radio/>} label={getPricingPlanUI(1)}/>
              <FormControlLabel value={2} control={<Radio/>} label={getPricingPlanUI(2)}/>
              <FormControlLabel value={3} control={<Radio/>} label={getPricingPlanUI(3)}/>
            </RadioGroup>
            : null}


          {pricingType === 'annual'
            ? <RadioGroup
              aria-labelledby="pricing-annual"
              value={pricingValue}
              onChange={handleFormValueChange}
            >
              <FormControlLabel value={4} control={<Radio/>} label={getPricingPlanUI(4)}/>
              <FormControlLabel value={5} control={<Radio/>} label={getPricingPlanUI(5)}/>
              <FormControlLabel value={6} control={<Radio/>} label={getPricingPlanUI(6)}/>
            </RadioGroup>
            : null}


          {CTAButtonDynamicVariant}

        </>}

    </Stack>

  </FormControl>
}

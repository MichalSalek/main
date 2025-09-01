import {Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, Typography} from '@mui/material'
import {useRouter} from 'next/router'
import {ReactElement, useCallback, useMemo} from 'react'
import {useAppSelector} from '../../../application/store/store'
import {STORE_SEL_user_currentUser} from '../../../domain/user/user.read'
import {ROUTES_FRONT_APP, ROUTES_FRONT_STATIC} from '../../../READONLY-shared-kernel/domain/routing/routing.config'
import {PRICING_POLICY} from '../../../READONLY-shared-kernel/policies/pricing.policy'
import {getPricingPlanUI} from './pricingPlanUI.api'
import {usePricingPlanData} from './usePricingPlanData.hook'
import {redirectToAction} from "../../../domain/redirections-and-routing/redirections.operations.api";
import {DataPassedBetweenViewsConfig} from "../../../application/data-between-views/dataBetweenViews.config";
import {setToClientStorage} from "../../../application/client-device-storage/clientStorage.possibilities.api";


export const PricingPlanWithRedirectMolecule = (): ReactElement => {
  const router = useRouter()

  const currentUser = useAppSelector(STORE_SEL_user_currentUser)

  const {
    pricingType,
    pricingValue,
    setPricingType,
    handleFormValueChange
  } = usePricingPlanData()

  const END_FIRST_STEP_CALLBACK = useCallback(
    async () => {

      setToClientStorage({
        key: DataPassedBetweenViewsConfig.KEYS.PRICING_PLAN,
        value: String(pricingValue),
        sessionOnly: true
      })

      if (currentUser?.user_id) {
        await redirectToAction({routePath: ROUTES_FRONT_APP.USER_ACCOUNT_PAY})
      } else {
        await redirectToAction({routePath: ROUTES_FRONT_STATIC.USER_REG})
      }
    },
    [currentUser,
      pricingValue])


  const CTAButton = useMemo(
    () => <Button
      onClick={END_FIRST_STEP_CALLBACK}
    > {'Idź dalej'} </Button>,
    [END_FIRST_STEP_CALLBACK])


  return <FormControl sx={{
    minHeight: '300px'
  }}>
    <FormLabel id="pricing-plan"><Typography variant={'body1'}><strong>Select best pricing
      plan</strong></Typography></FormLabel>

    <Stack sx={{
      flex: 1,
      justifyContent: 'space-between'
    }}>
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


      {CTAButton}


    </Stack>

  </FormControl>
}

import {Accordion, AccordionDetails, AccordionSummary, Divider, Stack, Typography} from '@mui/material'
import {ReactElement} from 'react'
import {TOKEN_AND_SESSION_EXPIRES_IN_XXX_SECONDS} from '../../../READONLY-shared-kernel/application/auth/auth.config'
import {EVENTS} from '../../../READONLY-shared-kernel/domain/commands-and-queries/cqrs.config'
import {
  CRITICAL_REDIRECTIONS_ON_EVENTS,
  REDIRECTIONS_ON_EVENTS,
  ROUTES_API,
  ROUTES_FRONT_APP,
  ROUTES_FRONT_STATIC
} from '../../../READONLY-shared-kernel/domain/routing/routing.config'
import {
  AccountStatusValue,
  EventLogTypeValue,
  PaymentStatusValue,
  RoleValue
} from '../../../READONLY-shared-kernel/models/db_models'
import {EVENTS_POLICY} from '../../../READONLY-shared-kernel/policies/events.policy'
import {PERMISSIONS_POLICY} from '../../../READONLY-shared-kernel/policies/permissions.policy'
import {theme} from '../../styles/theme'
import {getAppIcon} from '../../../domain/app-icons/adapters/MuiIcons.adapter';
import {allowedEventLogTypes} from '../../../READONLY-shared-kernel/domain/event-log/event_log.config';
import {activeAccountStates} from '../../../READONLY-shared-kernel/domain/user-and-account/user_and_account.config';
import {
  annualDiscountPercentageNumber,
  bestsellersValues,
  defaultPricingPlanPeriod,
  pricingPlanDataPLN
} from '../../../READONLY-shared-kernel/domain/pricing/pricing.config';


export const PolicyOrganism = (): ReactElement => {


  return (
    <>
      <Stack sx={{
        overflowX: 'auto'
      }}>


        <Typography variant={'h3'} m={2}>App icons:</Typography>

        <Stack flexDirection={'row'} flexWrap={'wrap'}>
          {Object.values(getAppIcon).map((icon) => icon())}
        </Stack>

        <Typography variant={'h3'} m={2}>TOKEN_AND_SESSION</Typography>

        <pre style={{
          flex: 1
        }}><strong>Session time in seconds: </strong>{TOKEN_AND_SESSION_EXPIRES_IN_XXX_SECONDS}</pre>
        <Typography color={theme.palette.primary.dark}>
          60 * 60 * 24 // 86400 s === 24 h
        </Typography>
        <Typography color={theme.palette.primary.dark}>
          60 * 60 * 16 // 57600 s === 16 h
        </Typography>


        <Divider sx={{margin: '50px'}}/>


        <Typography variant={'h3'} m={2}>EVENTS_POLICY</Typography>

        <pre style={{
          flex: 1
        }}><strong>eventsDisallowedForUI: </strong>{JSON.stringify(
          EVENTS_POLICY.eventsDisallowedForUI,
          undefined,
          3)}</pre>
        <Typography color={theme.palette.primary.dark}>
          Eventy wykluczone z widoczności w UI
        </Typography>


        <Divider sx={{margin: '50px'}}/>


        <Typography variant={'h3'} m={2}>EVENTS</Typography>

        <Accordion>
          <AccordionSummary expandIcon={getAppIcon.Expand()}>
            EVENTS
          </AccordionSummary>
          <AccordionDetails sx={{p: 0}}>
              <pre style={{
                flex: 1
              }}>{JSON.stringify(
                EVENTS,
                undefined,
                3)}</pre>
          </AccordionDetails>
        </Accordion>

        <Typography color={theme.palette.primary.dark}>
          Kolekcja wszystkich eventów, z podziałem na: komendy, zapytania oraz informacje na temat zdarzenia.
        </Typography>


        <Divider sx={{margin: '50px'}}/>


        <Typography variant={'h3'} m={2}>EVENT_LOG_STORE_POLICY</Typography>

        <pre style={{
          flex: 1
        }}>EventLogTypeValue: {JSON.stringify(
          EventLogTypeValue,
          undefined,
          3)}</pre>
        <Typography color={theme.palette.primary.dark}>
          Wszystkie możliwe typy eventów (w kontekście event stora).
        </Typography>


        <Divider sx={{
          margin: '24px',
          opacity: 0
        }}/>


        <pre style={{
          flex: 1
        }}><strong>allowedEventLogTypes: </strong>{JSON.stringify(
          allowedEventLogTypes,
          undefined,
          3)}</pre>
        <Typography color={theme.palette.primary.dark}>
          Wybrane eventy, które zbierane są do event stora z podziałem na typ eventu.
        </Typography>


        <Divider sx={{margin: '50px'}}/>


        <Typography variant={'h3'} m={2}>PERMISSIONS_POLICY</Typography>

        <pre style={{
          flex: 1
        }}><strong>readonlyPermissionsSets: </strong>{JSON.stringify(
          PERMISSIONS_POLICY.readonlyPermissionsSets,
          undefined,
          3)}</pre>
        <Typography color={theme.palette.primary.dark}>
          Kolekcje uprawnień do eventów przypisane na stałe.
        </Typography>


        <Divider sx={{
          margin: '24px',
          opacity: 0
        }}/>


        <pre style={{
          flex: 1
        }}><strong>runtimePermissionsSets: </strong>{JSON.stringify(
          PERMISSIONS_POLICY.runtimePermissionsSetsForEvents,
          undefined,
          3)}</pre>
        <Typography color={theme.palette.primary.dark}>
          Kolekcje uprawnień do eventów przypisywane dynamicznie w runtime apki.
        </Typography>


        <Divider sx={{
          margin: '24px',
          opacity: 0
        }}/>

        <pre style={{
          flex: 1
        }}><strong>RoleValue: </strong>{JSON.stringify(
          RoleValue,
          undefined,
          3)}</pre>
        <Typography color={theme.palette.primary.dark}>
          Wszystkie możliwe role.
        </Typography>


        <Divider sx={{
          margin: '24px',
          opacity: 0
        }}/>


        <pre style={{
          flex: 1
        }}><strong>permissionsForEvents: </strong>{JSON.stringify(
          PERMISSIONS_POLICY.permissionsForEventsByRole,
          undefined,
          3)}</pre>
        <Typography color={theme.palette.primary.dark}>
          Uprawnienia do eventów nadawane danym rolom podczas tworzenia danego usera.
        </Typography>
        <Typography color={theme.palette.primary.dark}>
          Przykładowo ACCOUNT_HOLDER po opłaceniu konta dostaje kolekcje w runtime:
          runtimePermissionsSets.ACTIVE_ACCOUNT
        </Typography>


        <Divider sx={{
          margin: '24px',
          opacity: 0
        }}/>


        <pre style={{
          flex: 1
        }}><strong>permissionsForRoutes: </strong>{JSON.stringify(
          PERMISSIONS_POLICY.permissionsForRoutes,
          undefined,
          3)}</pre>
        <Typography color={theme.palette.primary.dark}>
          Uprawnienia dotyczące routingu. Pusta tablica - każdy ma dostęp, łącznie z anonimem (niezalogowanym).
        </Typography>


        <Divider sx={{margin: '50px'}}/>

        <Typography variant={'h3'} m={2}>PRICING_POLICY</Typography>

        <pre style={{
          flex: 1
        }}><strong>PaymentStatusValue: </strong>{JSON.stringify(
          PaymentStatusValue,
          undefined,
          3)}</pre>
        <Typography color={theme.palette.primary.dark}>
          Wszystkie możliwe stany płatności.
        </Typography>


        <Divider sx={{
          margin: '24px',
          opacity: 0
        }}/>


        <pre style={{
          flex: 1
        }}><strong>pricingPlanDataPLN: </strong>{JSON.stringify(
          pricingPlanDataPLN,
          undefined,
          3)}</pre>
        <Typography color={theme.palette.primary.dark}>
          Plany płatności w PLN.
        </Typography>


        <Divider sx={{
          margin: '24px',
          opacity: 0
        }}/>


        <pre style={{
          flex: 1
        }}><strong>bestsellersValues: </strong>{JSON.stringify(
          bestsellersValues,
          undefined,
          3)}</pre>
        <Typography color={theme.palette.primary.dark}>
          Plany wyjątkowe.
        </Typography>


        <Divider sx={{
          margin: '24px',
          opacity: 0
        }}/>


        <pre style={{
          flex: 1
        }}><strong>defaultPricingPlanPeriod: </strong>{JSON.stringify(
          defaultPricingPlanPeriod,
          undefined,
          3)}</pre>
        <Typography color={theme.palette.primary.dark}>
          Domyślnie aktywny okres płatności.
        </Typography>


        <Divider sx={{
          margin: '24px',
          opacity: 0
        }}/>


        <pre style={{
          flex: 1
        }}><strong>annualDiscountPercentageNumber: </strong>{JSON.stringify(
          annualDiscountPercentageNumber,
          undefined,
          3)}</pre>
        <Typography color={theme.palette.primary.dark}>
          Zniżka przy wybraniu planu rocznego w procentach.
        </Typography>


        <Divider sx={{margin: '50px'}}/>

        <Typography variant={'h3'} m={2}>ROUTING_POLICY</Typography>

        <pre style={{
          flex: 1
        }}><strong>ROUTES_FRONT_STATIC: </strong>{JSON.stringify(
          ROUTES_FRONT_STATIC,
          undefined,
          3)}</pre>
        <Typography color={theme.palette.primary.dark}>
          Routy statyczne (dostępne dla każdego, zwykłe strony).
        </Typography>

        <Divider sx={{
          margin: '24px',
          opacity: 0
        }}/>


        <pre style={{
          flex: 1
        }}><strong>ROUTES_FRONT_APP: </strong>{JSON.stringify(
          ROUTES_FRONT_APP,
          undefined,
          3)}</pre>
        <Typography color={theme.palette.primary.dark}>
          Routy apkowe (dostępne po zalogowaniu).
        </Typography>


        <Divider sx={{
          margin: '24px',
          opacity: 0
        }}/>


        <pre style={{
          flex: 1
        }}><strong>ROUTES_API: </strong>{JSON.stringify(
          ROUTES_API,
          undefined,
          3)}</pre>
        <Typography color={theme.palette.primary.dark}>
          Routy backendowe (endpointy).
        </Typography>


        <Divider sx={{
          margin: '24px',
          opacity: 0
        }}/>


        <pre style={{
          flex: 1
        }}><strong>REDIRECTIONS_ON_EVENTS:</strong> {

          Object.entries(REDIRECTIONS_ON_EVENTS)
            .map((entire) => {
              return <pre key={entire[0]}>{entire[0]}: {JSON.stringify(entire[1])}</pre>
            })

        } {

          Object.entries(CRITICAL_REDIRECTIONS_ON_EVENTS)
            .map((entire) => {
              return <pre key={entire[0]}>{entire[0]}: {JSON.stringify(entire[1])}</pre>
            })

        }</pre>
        <Typography color={theme.palette.primary.dark}>
          Eventy wywołujące przekierowanie na inny route.
        </Typography>


        <Divider sx={{margin: '50px'}}/>

        <Typography variant={'h3'} m={2}>USER_POLICY</Typography>

        <pre style={{
          flex: 1
        }}><strong>AccountStatusValue: </strong>{JSON.stringify(
          AccountStatusValue,
          undefined,
          3)}</pre>
        <Typography color={theme.palette.primary.dark}>
          Wszystkie możliwe stany konta.
        </Typography>


        <Divider sx={{
          margin: '24px',
          opacity: 0
        }}/>


        <pre style={{
          flex: 1
        }}><strong>activeAccountStates: </strong>{JSON.stringify(
          activeAccountStates,
          undefined,
          3)}</pre>
        <Typography color={theme.palette.primary.dark}>
          Kiedy konto ma być brane za aktywne.
        </Typography>


      </Stack>

    </>)
}

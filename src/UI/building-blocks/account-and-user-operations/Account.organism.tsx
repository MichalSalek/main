import {Box, Stack, Tab, Tabs, Typography} from '@mui/material'
import {ReactElement, ReactNode, SyntheticEvent, useCallback, useState} from 'react'
import {useAppSelector} from '../../../application/store/store'
import {getEventLogs_IO} from '../../../domain/event-log-actions/eventLogIO.possibilities.api'
import {getDateForUI} from '../../features/UI.utils.api'
import {STORE_SEL_user_currentUser} from '../../../domain/user/user.read'
import {ROUTES_FRONT} from '../../../READONLY-shared-kernel/domain/routing/routing.config'
import {EventLog, EventLogTypeValue} from '../../../READONLY-shared-kernel/models/db_models'
import {LinkAtom} from '../_wide-use-components/Link.atom'
import {PricingPlanWithPaymentMolecule} from '../pricing-plan/PricingPlanWithPayment.molecule'
import {getPricingPlanUI} from "../pricing-plan/pricingPlanUI.api";
import {getAccountStatusUI} from "./userAndAccountUI.api";
import {STYLES_POLICY} from "../../../READONLY-shared-kernel/policies/styles.policy";
import {LoggedDevicesMolecule} from "./molecules/LoggedDevices.molecule";
import {getAppIcon} from "../../../domain/app-icons/adapters/MuiIcons.adapter";
import {useFireOnMountHook} from "@msalek/utils";


interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const {children, value, index, ...other} = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{p: 3}}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}


export const AccountOrganism = (): ReactElement => {

  const currentUser = useAppSelector(STORE_SEL_user_currentUser)


  const [accountEventLogs, setAccountEventLogs] = useState<EventLog[]>([])


  const getEventLogsCallback = useCallback(
    () => {
      void getEventLogs_IO(
        {type: EventLogTypeValue.ACCOUNT_EVENT_LOG},
        async (response) => {
          setAccountEventLogs(response.data)
        },
        async (error) => {
          console.log(error)
        })
    },
    [])


  useFireOnMountHook(getEventLogsCallback)


  const [tabIndex, setTabIndex] = useState(0)

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setTabIndex(newValue)
  };

  return <>

    <Stack>
      <Tabs
        variant="scrollable"
        scrollButtons="auto"
        value={tabIndex}
        onChange={handleChange}
        sx={{borderBottom: 1, borderColor: STYLES_POLICY.contourColor}}
      >
        <Tab
          icon={getAppIcon.Account()}
          label="Konto"/>
        <Tab
          icon={getAppIcon.PricingPlan()}
          label="Twój plan"
        />
        <Tab
          icon={getAppIcon.Devices()}
          label="Zalogowane urządzenia"/>
        <Tab
          icon={getAppIcon.HistoryBack()}
          label="Historia konta"/>
        <Tab
          icon={getAppIcon.Warning()}
          label="Dezaktywacja"/>
      </Tabs>
      <TabPanel value={tabIndex} index={0}>

        <b>Nazwa profilu: {currentUser?.account?.display_name} </b> [EDIT]
        <br/>
        <br/>
        <b>Status konta: {getAccountStatusUI(currentUser?.account.account_status)} </b>
        <br/>
        <br/>
        <b>Obecny pricing plan: {getPricingPlanUI(currentUser?.account?.pricing_plan)} </b>
        <br/>
        <b>Do kogo należy konto:</b>
        <br/>
        Twoja nazwa: {currentUser?.display_name} [EDIT]
        <br/>
        Twój email: {currentUser?.email} [EDIT]
        <br/>
        <br/>
        <b>Zmień swoje hasło:</b>
        <br/>
        [Wpisz obecne hasło]
        <br/>
        [Wpisz nowe hasło]
        <br/>
        [Powtórz nowe hasło]
        <br/>
        [ZMIEŃ HASŁO]
        <br/>
        <br/>

      </TabPanel>
      <TabPanel value={tabIndex} index={1}>

        <Typography variant={'caption'}>Zmień swój plan konta kiedy chcesz</Typography>
        <PricingPlanWithPaymentMolecule/>
        <Typography variant={'body2'}>Zmiana następuje od początku kolejnego okresu rozliczeniowego (miesiąc lub
          rok).</Typography>
        <br/>

      </TabPanel>
      <TabPanel value={tabIndex} index={2}>
        <LoggedDevicesMolecule/>
      </TabPanel>
      <TabPanel value={tabIndex} index={3}>

        <b> Historia zmian na profilu:</b>
        <br/>
        {accountEventLogs.map((el) => <li key={getDateForUI(el.created_at) + el.event_log_id}>
          <span>{getDateForUI(el.created_at)} </span>
          <span>{el.event}</span><br/>
        </li>)}
        <br/>
        <br/> <br/>

      </TabPanel>
      <TabPanel value={tabIndex} index={4}>

        <LinkAtom route={ROUTES_FRONT.USER_DEL_SELF} passPropsToButton={{color: 'warning'}}>
          Wstrzymanie płatności
        </LinkAtom>

      </TabPanel>
    </Stack>


  </>
}

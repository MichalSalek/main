import {ROUTES_FRONT} from '../../../READONLY-shared-kernel/domain/routing/routing.config';
import {LinkAtom} from '../_wide-use-components/Link.atom';
import {ROUTING_POLICY} from '../../../READONLY-shared-kernel/policies/routing.policy';


export const NotLoggedToolbarMolecule = () => {

  const isRegRoute = ROUTING_POLICY.utils.IS_THE_SAME_PATH(ROUTES_FRONT.USER_REG) || ROUTING_POLICY.utils.IS_THE_SAME_PATH(ROUTES_FRONT.USER_REG_PASS)

  return <>

    {!isRegRoute && <LinkAtom
        passPropsToButton={{
          variant: 'outlined',
          color: 'error'
        }}
        route={ROUTES_FRONT.USER_REG}>
        ZACZNIJ
    </LinkAtom>
    }
  </>
}

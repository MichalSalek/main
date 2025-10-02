import {Stack} from '@mui/material';
import {STYLES_POLICY} from '../../styles/styles.policy';
import {PageTitleAtom} from '../_wide-use-components/PageTitle.atom';
import {GoBackAtom} from '../_wide-use-components/GoBack.atom';
import {PagePropsWrapper} from '../../../pages/_app';

export const GoBackTitleBarOrganism = ({pageProps}: PagePropsWrapper) => {


  return <Stack sx={{
    height: STYLES_POLICY.goBackBarDimension,
    position: 'sticky',
    right: 0,
    zIndex: 1,
    top: `calc(${STYLES_POLICY.appBarDimension} + ${STYLES_POLICY.spacing[1]})`,
    paddingLeft: STYLES_POLICY.containerGutter[0],
    paddingRight: STYLES_POLICY.containerGutter[0],
    alignItems: 'baseline',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
    marginLeft: 'auto'
  }}>
    <PageTitleAtom title={pageProps.title}/>
    <GoBackAtom/>
  </Stack>
}

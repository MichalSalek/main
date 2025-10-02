import {Typography} from '@mui/material';
import {STYLES_POLICY} from '../../styles/styles.policy';


export const PageTitleAtom = ({title}: { title?: string }) => {

  return <Typography
    sx={{
      visibility: title ? 'visible' : 'hidden',
      position: 'fixed',
      left: STYLES_POLICY.containerGutter[0],
      top: '10px'
    }}
    variant={'h3'}
  >{title}</Typography>
}

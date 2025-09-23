import IconButton from '@mui/material/IconButton';
import {getAppIcon} from '../../../domain/app-icons/adapters/MuiIcons.adapter';
import Badge from '@mui/material/Badge';


export const LoggedToolbarMolecule = () => {

  return <>

    <IconButton
      size="large"
      aria-label="show new notifications"
      color="inherit"
    >
      <Badge badgeContent={1} color="error">
        {getAppIcon.Notification()}
      </Badge>
    </IconButton>

  </>
}

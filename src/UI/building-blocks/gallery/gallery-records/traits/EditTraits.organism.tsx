import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import {Button, Stack, Toolbar, Typography} from '@mui/material';
import {getAppIcon} from '../../../../../domain/app-icons/adapters/MuiIcons.adapter';
import {EditTraitsFormMolecule, EditTraitsFormProps} from './EditTraitsForm.molecule';
import {STYLES_POLICY} from '../../../../styles/styles.policy';


type Props = {
  isViewOpen: boolean
  handleCloseView: () => void
} & EditTraitsFormProps

export const EditTraitsOrganism = (
  {
    isViewOpen,
    handleCloseView,
    ...restProps
  }: Props
) => {


  return (
    <Dialog
      open={isViewOpen}
      onClose={handleCloseView}
      slotProps={{
        paper: {
          sx: {
            justifyContent: 'space-between'
          }
        }
      }}
    >

      <Stack sx={{
        width: '100%'
      }}>
        <Typography variant={'caption'} marginBottom={STYLES_POLICY.spacing[3]}>Edytuj cechy zdjęcia</Typography>

        <EditTraitsFormMolecule {...restProps} />

      </Stack>

      <Toolbar sx={{
        justifyContent: 'flex-end',
      }}>
        <Button
          color={'info'}
          onClick={handleCloseView}
          size={'large'}
        >
          OK {getAppIcon.Accept({color: 'inherit', fontSize: 'large', sx: {marginLeft: STYLES_POLICY.spacing[2]}})}
        </Button>
      </Toolbar>

    </Dialog>
  );
}

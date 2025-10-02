import {ReactElement, ReactNode, useCallback, useState} from 'react';
import {VALIDATION_POLICY} from '../../../../../READONLY-shared-kernel/policies/validation.policy';
import {Button, FormGroup, InputAdornment, Paper, TextField, Typography} from '@mui/material';
import {STYLES_POLICY} from '../../../../styles/styles.policy';
import {getAppIcon} from '../../../../../domain/app-icons/adapters/MuiIcons.adapter';

type Props = {
  title: string | ReactElement
  shouldShowScrollArrow: boolean
  children: ReactNode
  searchValueSubscription: (searchValue: string) => void
}

export const ListComposition = ({title, shouldShowScrollArrow, children, searchValueSubscription}: Props) => {

  const [searchValue, setSearchValue] = useState<string>('')

  const setEndEmitSearchValue = useCallback((searchValue: string) => {
    setSearchValue(searchValue)
    searchValueSubscription(VALIDATION_POLICY.utils.normalizeStringCapitalizedWords(searchValue))
  }, [searchValueSubscription])

  return <>
    <Typography variant={'h2'}>{title}</Typography>

    <Paper
      variant={'outlined'}
      sx={{
        position: 'relative',
        overflowY: 'scroll',
        height: '30dvh',
        marginBottom: STYLES_POLICY.spacing[4],
        paddingTop: 0
      }}
    >

      <TextField
        value={searchValue}
        onChange={(e) => {
          setEndEmitSearchValue(e.target.value)
        }}
        slotProps={{
          root: {
            sx: {
              backgroundColor: STYLES_POLICY.backgroundColor[1],
              position: 'sticky',
              top: 0,
              zIndex: 1,
              padding: STYLES_POLICY.spacing[1]
            }
          },
          input: {
            startAdornment: (
              <InputAdornment position="start">
                {getAppIcon.Search({fontSize: 'small'})}
              </InputAdornment>
            ),
            endAdornment: searchValue.length ? (
              <InputAdornment onClick={() => {
                setEndEmitSearchValue('')
              }} position="start">
                {getAppIcon.Clear({fontSize: 'medium'})}
              </InputAdornment>
            ) : undefined
          },
        }}
      />

      <FormGroup>
        {children}
      </FormGroup>

      {shouldShowScrollArrow && <Button
          variant={'text'}
          sx={
            {
              pointerEvents: 'none',
              padding: 0,
              position: 'sticky',
              left: '100%',
              bottom: 0
            }
          }
      >
        {getAppIcon.Scrollable({
          fontSize: 'small'
        })}
      </Button>
      }

    </Paper>
  </>
}

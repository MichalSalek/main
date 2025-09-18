import {Box, Chip} from '@mui/material'
import {STYLES_POLICY} from '../../../../../../READONLY-shared-kernel/policies/styles.policy'
import {ReactElement} from 'react'


export const FilterSelectedValuesAtom = <T extends string | number>(props: { values: T[] }): ReactElement => {
  return <Box sx={{
    display: 'flex',
    flexWrap: 'wrap',
    gap: STYLES_POLICY.spacing[1],
    padding: STYLES_POLICY.spacing[1]
  }}>
    {(props.values ?? []).map((value) => (
      <Chip size={'small'} color={'secondary'} key={value} label={value}/>
    ))}
  </Box>
}

import {Box, Chip} from '@mui/material'
import {STYLES_POLICY} from '../../../../../styles/styles.policy'
import {ReactElement} from 'react'


export const FilterSelectedValuesAtom = <T extends string | number>(props: {
  values: T[] | undefined
}): ReactElement => {
  return <Box sx={{
    display: 'flex',
    flexWrap: 'wrap',
    gap: STYLES_POLICY.spacing[1],
    padding: STYLES_POLICY.spacing[1]
  }}>
    {(props.values ?? []).map((value) => (
      <Chip color={'secondary'} key={value} label={value}/>
    ))}
  </Box>
}

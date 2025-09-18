import {FormControl, Typography} from '@mui/material'
import {ReactElement} from 'react'

type Props = {
  children: ReactElement
  name: string
}

export const FilterWrapperComposition = ({children, name}: Props): ReactElement => {

  return <FormControl>
    <Typography variant={'caption'}>{name}</Typography>

    {children}

  </FormControl>
}

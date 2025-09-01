import {Box, SxProps, Theme, Typography} from '@mui/material'
import {ReactElement, ReactNode} from 'react'


const style: SxProps<Theme> = {
  border: '1px solid gray',
  borderRadius: '4px',
  padding: '10px 3px',
  flexDirection: 'column',
  display: 'flex',
  gap: '5px',
  flex: 1,
  minWidth: '328px'
}

export const AdminSimpleBox = ({
                                 title,
                                 children
                               }: {
  title: string
  children: ReactNode
}): ReactElement | undefined => {


  return (
    <Box sx={style}>
      <Typography variant={'h3'} sx={{
        textAlign: 'center'
      }}>{title}</Typography>
      {children}
    </Box>)
}

import {Box, SxProps, TextField, Theme, Typography} from '@mui/material'
import {MouseEventHandler, ReactElement, useCallback} from 'react'
import {STYLES_POLICY} from '../../../styles/styles.policy';


export const LineRecordAtom = ({
                                 el1,
                                 el2,
                                 sx
                               }: {
  el1: string | ReactElement,
  el2?: string | ReactElement | null,
  sx?: SxProps<Theme> | undefined
}): ReactElement => {
  const selectTextOnClickCallback: MouseEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const isHTMLElement = (el: unknown): el is HTMLInputElement => {
        return Boolean((
          e.target as HTMLInputElement).select)
      }
      isHTMLElement(e.target) && e.target.select()
    },
    [])

  return <Box
    sx={{
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      gap: 3, ...sx
    }}
  >

    {typeof el1 === 'string' && <Typography
        sx={{
          flex: 1,
          maxWidth: '80px',
          fontSize: STYLES_POLICY.fontSize[0]
        }}
    >{el1}</Typography>}
    {typeof el1 === 'object' && el1}


    {(typeof el2 === 'string' || el2 === null) && <TextField
        variant={'standard'}
        sx={{
          flex: 1,
          minWidth: '210px',
          my: '0',
          'input.MuiInput-input': {
            padding: 0
          }
        }} value={el2 ?? '–'} onClick={selectTextOnClickCallback}/>}
    {typeof el2 === 'object' && el2}

  </Box>
}



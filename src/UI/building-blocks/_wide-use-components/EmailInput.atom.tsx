import {TextField} from '@mui/material'
import {useEffect, useMemo} from 'react'
import {DataPassedBetweenViewsConfig} from '../../../application/data-between-views/dataBetweenViews.config'
import {VALIDATION_POLICY} from '../../../READONLY-shared-kernel/policies/validation.policy'
import {
  deleteFromClientStorage,
  getFromClientStorage
} from "../../../application/client-device-storage/clientStorage.possibilities.api";


export const EmailInputAtom = ({
                                 value,
                                 setValue = (v) => v,
                                 readOnly = false
                               }: {
  value?: string
  setValue?: (v: string) => void
  readOnly?: boolean;
}) => {

  const storedData = useMemo(
    () => getFromClientStorage({key: DataPassedBetweenViewsConfig.KEYS.EMAIL}),
    [])


  useEffect(
    () => {
      //
      // 1. Has stored data to set,
      // 2. Does not have value from a parent,
      // 3. Not a read-only mode.
      //
      if (storedData && !value && !readOnly) {

        //
        // 1. Consume:
        //
        setValue(storedData)

        //
        // 1. Clean:
        //
        deleteFromClientStorage({key: DataPassedBetweenViewsConfig.KEYS.EMAIL})
      }

    },
    [value,
      setValue,
      storedData,
      readOnly])


  return <TextField
    disabled={readOnly}
    label={'Podaj swój email'}
    name="email"
    defaultValue={readOnly ? VALIDATION_POLICY.utils.normalizeStringEliminateWhitespaces(storedData) : undefined}
    value={readOnly ? undefined : VALIDATION_POLICY.utils.normalizeStringEliminateWhitespaces(value)}
    onChange={(e) => setValue(e.currentTarget.value)}></TextField>
}

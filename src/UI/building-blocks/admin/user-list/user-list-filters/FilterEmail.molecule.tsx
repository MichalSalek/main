import {TextField} from '@mui/material'
import {ChangeEvent, ReactElement, useCallback, useState} from 'react'
import {User} from "../../../../../READONLY-shared-kernel/models/db_models";
import {STYLES_POLICY} from "../../../../../READONLY-shared-kernel/policies/styles.policy";
import {useFilterGenericHook} from "./generics/useFilterGeneric.hook";
import {FilterWrapperComposition} from "./generics/FilterWrapper.composition";
import {FiltersCallbackProps} from "./Filters.container";


export const FilterEmailMolecule = ({callback}: FiltersCallbackProps): ReactElement => {

  const {appUsers} = useFilterGenericHook()
  const [filterValue, setFilterValue] = useState<User['email']>('')

  const handleChangeFilter = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: {value},
    } = event;

    const filterValue = value
    setFilterValue(filterValue)

    const IDsToHideOnUI = filterValue !== '' ?

      appUsers.filter((user) => {
        return !user.email.toLowerCase().includes(filterValue.toLowerCase())
      }).map((user) => user.user_id)

      : []

    callback(IDsToHideOnUI, 'email')

  }, [appUsers, callback])


  return <FilterWrapperComposition name={'email'}>

    <TextField
      variant={'outlined'}
      value={filterValue}
      onChange={handleChangeFilter}
      sx={{
        '.MuiOutlinedInput-notchedOutline': {borderColor: filterValue !== '' ? STYLES_POLICY.statusColors[0] : undefined}
      }}
    />

  </FilterWrapperComposition>
}

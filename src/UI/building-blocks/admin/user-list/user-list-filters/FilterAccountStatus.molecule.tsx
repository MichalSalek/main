import {Checkbox, ListItemText, MenuItem, Select, SelectChangeEvent} from '@mui/material'
import {ReactElement, useCallback, useState} from 'react'
import {AccountStatus, AccountStatusValue} from '../../../../../READONLY-shared-kernel/models/db_models';
import {STYLES_POLICY} from '../../../../../READONLY-shared-kernel/policies/styles.policy';
import {useFilterGenericHook} from './generics/useFilterGeneric.hook';
import {FilterWrapperComposition} from './generics/FilterWrapper.composition';
import {FilterSelectedValuesAtom} from './generics/FilterSelectedValues.atom';
import {FiltersCallbackProps} from './Filters.container';
import {getAccountStatusUI} from '../../../account-and-user-operations/userAndAccountUI.api';


export const FilterAccountStatusMolecule = ({callback}: FiltersCallbackProps): ReactElement => {

  const {appUsers, isFilterDisabled, setIsFilterDisabled, isFilterActiveCollection} = useFilterGenericHook()
  const [filterValues, setFilterValues] = useState<AccountStatus[]>([])

  const handleChangeFilter = useCallback((event: SelectChangeEvent<typeof filterValues>) => {
    setIsFilterDisabled(true)
    const {
      target: {value},
    } = event;
    const filterValue = (typeof value === 'string' ? value.split(',') : value) as typeof filterValues
    setFilterValues(filterValue)

    const IDsToHideOnUI = isFilterActiveCollection(filterValue) ?

      appUsers.filter((user) => {
        return !filterValue.includes(user.account.account_status)
      }).map((user) => user.user_id)

      : []

    callback(IDsToHideOnUI, 'account_status')
    setIsFilterDisabled(false)
  }, [appUsers, callback, isFilterActiveCollection, setIsFilterDisabled])


  return <FilterWrapperComposition name={'Status konta'}>
    <Select
      multiple
      value={filterValues}
      onChange={handleChangeFilter}
      slotProps={{
        notchedOutline: {sx: {borderColor: isFilterActiveCollection(filterValues) ? STYLES_POLICY.statusColors[0] : undefined}}
      }}
      renderValue={(selected) => (
        <FilterSelectedValuesAtom values={selected}/>
      )}
    >
      {Object.values(AccountStatusValue).map((value) => (
        <MenuItem
          disabled={isFilterDisabled}
          key={value}
          value={value}
        >
          <Checkbox checked={filterValues.includes(value)}/>
          <ListItemText primary={getAccountStatusUI(value)}/>
        </MenuItem>

      ))}
    </Select>
  </FilterWrapperComposition>
}

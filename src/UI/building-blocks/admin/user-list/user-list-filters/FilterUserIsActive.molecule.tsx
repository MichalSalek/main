import {Checkbox, ListItemText, MenuItem, Select, SelectChangeEvent} from '@mui/material'
import {ReactElement, useCallback, useState} from 'react'
import {STYLES_POLICY} from '../../../../styles/styles.policy';
import {useFilterGenericHook} from './generics/useFilterGeneric.hook';
import {FilterWrapperComposition} from './generics/FilterWrapper.composition';
import {FilterSelectedValuesAtom} from './generics/FilterSelectedValues.atom';
import {FiltersCallbackProps} from './Filters.container';
import {YesOrNoFilter, YesOrNoFilterValue} from './userListFilters.types';


export const FilterUserIsActiveMolecule = ({callback}: FiltersCallbackProps): ReactElement => {

  const {appUsers, isFilterDisabled, setIsFilterDisabled, isFilterActiveCollection} = useFilterGenericHook()
  const [filterValues, setFilterValues] = useState<YesOrNoFilter[]>([])

  const handleChangeFilter = useCallback((event: SelectChangeEvent<typeof filterValues>) => {
    setIsFilterDisabled(true)
    const {
      target: {value},
    } = event;
    const filterValue = (typeof value === 'string' ? value.split(',') : value) as typeof filterValues
    setFilterValues(filterValue)

    const IDsToHideOnUI = isFilterActiveCollection(filterValue) ?
      appUsers.filter((user) => {
        return !filterValue.includes(user.is_active ? 'YES' : 'NO')
      }).map((user) => user.user_id)
      : []

    callback(IDsToHideOnUI, 'is_active')
    setIsFilterDisabled(false)
  }, [appUsers, callback, isFilterActiveCollection, setIsFilterDisabled])


  return <FilterWrapperComposition name={'Czy użytkownik jest aktywny'}>
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
      {Object.values(YesOrNoFilterValue).map((value) => (
        <MenuItem
          disabled={isFilterDisabled}
          key={value}
          value={value}
        >
          <Checkbox checked={filterValues.includes(value)}/>
          <ListItemText primary={value}/>
        </MenuItem>

      ))}
    </Select>
  </FilterWrapperComposition>
}

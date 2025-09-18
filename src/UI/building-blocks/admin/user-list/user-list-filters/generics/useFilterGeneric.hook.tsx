import {useCallback, useContext, useState} from 'react'
import {AdminContext} from "../../../../../../domain/admin/admin.context";


export const useFilterGenericHook = () => {

  const {appUsers} = useContext(AdminContext)

  const [isFilterDisabled, setIsFilterDisabled] = useState<boolean>(false)

  const isFilterActiveCollection = useCallback((filterValues: any[]) => filterValues.length > 0, [])


  return {appUsers, isFilterDisabled, setIsFilterDisabled, isFilterActiveCollection} as const
}

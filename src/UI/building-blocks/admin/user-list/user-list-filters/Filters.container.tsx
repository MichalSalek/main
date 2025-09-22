import {FilterPaymentStatusMolecule} from './FilterPaymentStatus.molecule';
import {FilterRoleMolecule} from './FilterRole.molecule';
import {RefObject, startTransition, useCallback, useContext, useRef, useState} from 'react';
import {IDType} from '../../../../../READONLY-shared-kernel/application/application.types';
import {Stack, Typography} from '@mui/material';
import {FilterAccountStatusMolecule} from './FilterAccountStatus.molecule';
import {STYLES_POLICY} from '../../../../../READONLY-shared-kernel/policies/styles.policy';
import {FilterUserIsActiveMolecule} from './FilterUserIsActive.molecule';
import {FilterEmailMolecule} from './FilterEmail.molecule';
import {AdminContext} from '../../../../../domain/admin/admin.context';


type CollectionRandomUniqueID = string

export type FiltersCallbackProps = {

  // callback @collectionRandomUniqueID param - just unique string to distinguish two collections from each other in logic.
  // The content is not important.
  callback: (collection: IDType[], collectionRandomUniqueID: CollectionRandomUniqueID) => void
}

export type FiltersContainerProps = {
  usersListRef: RefObject<HTMLElement | null>
}

export const FiltersContainer = ({usersListRef}: FiltersContainerProps) => {

  const {appUsers} = useContext(AdminContext)

  //
  // If user exists in any collectin - that is mean he is filtered out and cannot be visible in UI.
  //
  // { collectionRandomUniqueID: [user1, user2...] }
  //
  const IDMatrix = useRef<Record<CollectionRandomUniqueID, IDType[]>>({})


  const [usersAfterFiltering, setUsersAfterFiltering] = useState<number | null>(null)


  const filterCallback = useCallback<FiltersCallbackProps['callback']>((collection, collectionRandomUniqueID) => {
    // Update collection with fresh filters:
    //
    IDMatrix.current[collectionRandomUniqueID] = collection

    const childNodesRef = usersListRef.current?.children ?? []
    const allUsersAmount = childNodesRef.length
    let usersAmountAfterFiltering = allUsersAmount
    const IDToHideArray = Object.values(IDMatrix.current).flat()

    // Control view action:
    //
    startTransition(() => {
      for (let i = 0; i < childNodesRef.length; i++) {
        const element = childNodesRef[i] as HTMLElement
        const idConvertedToNumber = Number(element.id)
        if (IDToHideArray.includes(idConvertedToNumber)) {
          element.style.display = 'none'
        } else {
          usersAmountAfterFiltering--
          element.style.display = ''
        }
      }
    })
    setUsersAfterFiltering(allUsersAmount - usersAmountAfterFiltering)
  }, [usersListRef])

  return <Stack sx={{marginTop: STYLES_POLICY.spacing[4]}}>

    <Typography
      variant={'h3'}>Filtruj:</Typography>


    <FilterUserIsActiveMolecule callback={filterCallback}/>

    <FilterAccountStatusMolecule callback={filterCallback}/>

    <FilterRoleMolecule callback={filterCallback}/>

    <FilterPaymentStatusMolecule callback={filterCallback}/>

    <FilterEmailMolecule callback={filterCallback}/>


    <Typography variant={'h3'}>Ilość użytkowników: <Typography
      sx={{
        marginBottom: STYLES_POLICY.spacing[2],
        visibility: usersAfterFiltering === null ? 'hidden' : 'visible'
      }}
      color={usersAfterFiltering === appUsers.length ? undefined : 'success'}
      component={'span'}
      variant={'h3'}>{usersAfterFiltering} / </Typography> {appUsers.length} </Typography>

  </Stack>
}

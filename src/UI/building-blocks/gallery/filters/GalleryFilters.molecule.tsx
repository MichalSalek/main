import {Button, Dialog, IconButton, Stack, Switch, Toolbar, Typography} from '@mui/material';
import {EditTraitsFormMolecule} from '../gallery-records/traits/EditTraitsForm.molecule';
import {ChangeEvent, useCallback, useContext, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../../application/store/store';
import {STORE_SEL_gallery_filtersStrictSwitch} from '../../../../domain/gallery/gallery.read';
import {STORE_SET_gallery_filtersStrictSwitch} from '../../../../domain/gallery/gallery.slice';
import {getGalleryRecords_IO} from '../../../../domain/gallery/galleryIO.possibilities.api';
import {freezeThreadAndWait, useFireOnMountHook} from '@msalek/utils';
import {GalleryRecord} from '../../../../READONLY-shared-kernel/models/db_models';
import {getAppIcon} from '../../../../domain/app-icons/adapters/MuiIcons.adapter';
import {useSetActonButtonsHook} from '../../../application-hooks/useSetActonButtons.hook';
import {GalleryDataContext} from '../../../../domain/gallery/gallery-data/galleryData.context';
import {TraitsPartial} from '../../../../domain/gallery/traits.types';

export const GalleryFiltersMolecule = () => {

  const {galleryRecords, setGalleryRecords} = useContext(GalleryDataContext)

  const [selectedTraits, setSelectedTraits] = useState<TraitsPartial>({
    asset_traits: [],
    asset_color_traits: []
  })

  const strictFilter = useAppSelector(STORE_SEL_gallery_filtersStrictSwitch)
  const dispatch = useAppDispatch()

  const [filterActionDisabledState, setFilterActionDisabledState] = useState<boolean>(false)


  const [isViewOpen, setFiltersViewOpen] = useState(false)

  const setActionButtons = useSetActonButtonsHook()

  useEffect(() => {
    setActionButtons([{
      title: 'FILTRY',
      action: () => setFiltersViewOpen(true),
      icon: getAppIcon.Filter
    }])
  }, [setActionButtons])

  const handleCloseView = useCallback(() => {
    setFiltersViewOpen(false)
  }, [])

  const onFiltersAction = useCallback((data: GalleryRecord[]) => {
    handleCloseView()
    setGalleryRecords(data)
  }, [handleCloseView, setGalleryRecords])


  const handleChangeStrictSwitch = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(STORE_SET_gallery_filtersStrictSwitch(event.target.checked))
  }

  const getGalleryRecordsClosure = useCallback(async () => {
    setFilterActionDisabledState(true)
    await getGalleryRecords_IO({
        asset_traits: selectedTraits.asset_traits,
        asset_color_traits: selectedTraits.asset_color_traits,
        apply_strict_filter: strictFilter
      },
      async (response) => {
        onFiltersAction(response.data)
      },
      async (error) => {
        console.error(error)

      })
    await freezeThreadAndWait(1000)
    setFilterActionDisabledState(false)

  }, [onFiltersAction, selectedTraits.asset_color_traits, selectedTraits.asset_traits, strictFilter])


  useFireOnMountHook(getGalleryRecordsClosure)


  return <Dialog
    open={isViewOpen}
    onClose={handleCloseView}
  >
    <Toolbar sx={{
      justifyContent: 'flex-end',
    }}>
      <IconButton
        color="inherit"
        onClick={handleCloseView}
        aria-label="close"
      >
        {getAppIcon.Back()} <Typography variant={'overline'}>Wróć</Typography>
      </IconButton>
    </Toolbar>

    <Stack sx={{
      width: '100%'
    }}>
      <Typography variant={'h3'}>Filtry</Typography>
      <EditTraitsFormMolecule
        selectedTraits={selectedTraits}
        setSelectedTraits={setSelectedTraits}
      />
      <Stack flexDirection={'row'} alignItems={'center'}>
        <Typography variant={'caption'}>Wyszukaj dokładnie</Typography>
        <Switch
          checked={strictFilter}
          onChange={handleChangeStrictSwitch}
        />
      </Stack>
      <Button onClick={getGalleryRecordsClosure} disabled={filterActionDisabledState}>Filtruj (23)</Button>


      {galleryRecords?.length === 0 ?
        <span>Brak wyników dla ustawionych filtrów.</span> : undefined}


    </Stack>

  </Dialog>
}

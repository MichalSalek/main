import {Button, Dialog, IconButton, Stack, Switch, Toolbar, Typography} from "@mui/material";
import {SelectAnyTraitsInputMolecule} from "../gallery-records/add-new/SelectAnyTraitsInput.molecule";
import {useGetGalleryConfig} from "../hooks/useGetGalleryConfig.hook";
import {ChangeEvent, useCallback, useContext, useEffect, useRef, useState} from "react";
import {Trait} from "../../../../READONLY-shared-kernel/domain/gallery/gallery.types";
import {useAppDispatch, useAppSelector} from "../../../../application/store/store";
import {STORE_SEL_gallery_filtersStrictSwitch} from "../../../../domain/gallery/gallery.read";
import {STORE_SET_gallery_filtersStrictSwitch} from "../../../../domain/gallery/gallery.slice";
import {getGalleryRecords_IO} from "../../../../domain/gallery/galleryIO.possibilities.api";
import {freezeThreadAndWait, useFireOnMountHook} from "@msalek/utils";
import {GalleryRecord} from "../../../../READONLY-shared-kernel/models/db_models";
import {getAppIcon} from "../../../../domain/app-icons/adapters/MuiIcons.adapter";
import {useSetActonButtonsHook} from "../../../application-hooks/useSetActonButtons.hook";
import {GalleryDataContext} from "../../../../domain/gallery/gallery-data/galleryData.context";

export const GalleryFiltersMolecule = () => {

  const {galleryRecords, setGalleryRecords} = useContext(GalleryDataContext)

  const {galleryConfig} = useGetGalleryConfig()

  const selectedTraitsRef = useRef<Trait[]>([])
  const selectedColorTraitsRef = useRef<Trait[]>([])

  const strictFilter = useAppSelector(STORE_SEL_gallery_filtersStrictSwitch)
  const dispatch = useAppDispatch()

  const [filterActionDisabledState, setFilterActionDisabledState] = useState<boolean>(false)


  const [isFiltersViewOpen, setFiltersViewOpen] = useState(false)

  const setActionButtons = useSetActonButtonsHook()

  useEffect(() => {
    setActionButtons([{
      title: 'FILTRY',
      action: () => setFiltersViewOpen(true),
      icon: getAppIcon.Filter()
    }])
  }, [setActionButtons])

  const handleCloseCreateFiltersView = useCallback(() => {
    setFiltersViewOpen(false)
  }, [])

  const onFiltersAction = useCallback((data: GalleryRecord[]) => {
    handleCloseCreateFiltersView()
    setGalleryRecords(data)
  }, [handleCloseCreateFiltersView, setGalleryRecords])


  const handleChangeStrictSwitch = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(STORE_SET_gallery_filtersStrictSwitch(event.target.checked))
  }

  const getGalleryRecordsClosure = useCallback(async () => {
    setFilterActionDisabledState(true)
    await getGalleryRecords_IO({
        asset_traits: selectedTraitsRef.current,
        asset_color_traits: selectedColorTraitsRef.current,
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

  }, [onFiltersAction, strictFilter])


  useFireOnMountHook(getGalleryRecordsClosure)


  return <Dialog
    keepMounted={true}
    fullScreen
    open={isFiltersViewOpen}
    onClose={handleCloseCreateFiltersView}
    disableEscapeKeyDown
  >
    <Toolbar sx={{
      justifyContent: 'flex-end',
    }}>
      <IconButton
        edge={'end'}
        color="inherit"
        onClick={handleCloseCreateFiltersView}
        aria-label="close"
      >
        {getAppIcon.Back()}
      </IconButton>
    </Toolbar>

    <Stack sx={{
      width: '100%'
    }}>
      <Typography variant={'h3'}>Filtry</Typography>
      <SelectAnyTraitsInputMolecule
        galleryConfig={galleryConfig} valuesRef={selectedTraitsRef}
        traitsType={'records_traits'} disableAdding={true}/>
      <SelectAnyTraitsInputMolecule
        galleryConfig={galleryConfig} valuesRef={selectedColorTraitsRef}
        traitsType={'records_color_traits'}
        disableAdding={true}/>
      <Stack flexDirection={'row'} alignItems={'center'}>
        <Typography variant={'caption'}>Wyszukaj dokładnie</Typography>
        <Switch
          checked={strictFilter}
          onChange={handleChangeStrictSwitch}
        />
      </Stack>
      <Button onClick={getGalleryRecordsClosure} disabled={filterActionDisabledState}>Wyświetl wyniki</Button>


      {galleryRecords?.length === 0 ?
        <span>Brak wyników dla ustawionych filtrów.</span> : undefined}


    </Stack>

  </Dialog>
}

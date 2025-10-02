import * as React from 'react';
import {
  ChangeEvent,
  Dispatch,
  FormEventHandler,
  ReactNode,
  SetStateAction,
  useCallback,
  useMemo,
  useState
} from 'react';
import {Box, Checkbox, Chip, FormControlLabel, Typography} from '@mui/material';
import {Trait} from '../../../../../READONLY-shared-kernel/domain/gallery/gallery.types';
import {createTrait_IO} from '../../../../../domain/gallery/galleryIO.possibilities.api';
import {VALIDATION_POLICY} from '../../../../../READONLY-shared-kernel/policies/validation.policy';
import {TraitsCollectionsNames, TraitsPartial} from '../../../../../domain/gallery/traits.types';
import {useUserTraits} from './useUserTraits.hook';
import {traitsPartialClearedValues} from '../../../../../domain/gallery/traits.config';
import {ListComposition} from './List.composition';
import {STYLES_POLICY} from '../../../../styles/styles.policy';


export type EditTraitsFormProps = {
  selectedTraits: TraitsPartial
  setSelectedTraits: Dispatch<SetStateAction<TraitsPartial>>
}


const MIN_NUMBER_TO_SHOW_SCROLLABLE_ICON = 4 as const


export const EditTraitsFormMolecule = (
  {
    selectedTraits,
    setSelectedTraits
  }: EditTraitsFormProps
) => {

  const {
    galleryConfig,
    updateGalleryConfig,
    isTraitExistingInUserCollection,
    isColorTraitExistingInUserCollection
  } = useUserTraits()

  const validationObject = useMemo(() => VALIDATION_POLICY.validators.createGalleryRecord({asset_url: '', ...selectedTraits}), [selectedTraits])


  const [creatingNewTraitValue, setCreatingNewTraitValue] = useState<Trait>('')
  const [creatingNewValueInProgressState, setCreatingNewValueInProgressState] = useState(false)


  const addOrRemoveSelectedTrait = useCallback((el: Trait, collectionName: TraitsCollectionsNames, shouldBeAdded: boolean) => {
    let updatedObj: TraitsPartial = traitsPartialClearedValues
    if (shouldBeAdded) {
      setSelectedTraits((prev) => {
        updatedObj = {...prev, [collectionName]: [...prev[collectionName], el]}
        return updatedObj
      })
    } else {
      setSelectedTraits((prev) => {
        updatedObj = {...prev, [collectionName]: [...prev[collectionName].filter((element) => element !== el)]}
        return updatedObj
      })
    }

  }, [setSelectedTraits])


  const handleCreateNewTrait: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()
    const normalizedValue = VALIDATION_POLICY.utils.normalizeStringCapitalizedWords(creatingNewTraitValue)

    if (isTraitExistingInUserCollection(normalizedValue)) {
      alert('już istnieje, została właśnie zaznaczona.')
      setCreatingNewTraitValue('')

    } else {
      setCreatingNewValueInProgressState(true)
      await createTrait_IO(
        {
          trait: normalizedValue
        },
        async (response) => {
          updateGalleryConfig()
        },
        async (error) => {
        })
      setCreatingNewValueInProgressState(false)
    }

    addOrRemoveSelectedTrait(normalizedValue, 'asset_traits', true)
  }


  const handleCreateNewColorTrait: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()
    const normalizedValue = VALIDATION_POLICY.utils.normalizeStringCapitalizedWords(creatingNewTraitValue)

    if (isColorTraitExistingInUserCollection(normalizedValue)) {
      alert('już istnieje, została właśnie zaznaczona.')
      setCreatingNewTraitValue('')

    } else {
      setCreatingNewValueInProgressState(true)
      await createTrait_IO(
        {
          color_trait: normalizedValue
        },
        async (response) => {
          updateGalleryConfig()
        },
        async (error) => {
        })
      setCreatingNewValueInProgressState(false)
    }

    addOrRemoveSelectedTrait(normalizedValue, 'asset_color_traits', true)
  }


  const [traitsSearchValue, setTraitsSearchValue] = useState<string>('')

  const renderTraits = useMemo<ReactNode[]>(() => {
    if (!galleryConfig) return []
    return galleryConfig?.records_traits.map((el) =>
      el.includes(traitsSearchValue) ? <FormControlLabel
        key={el}
        label={el}
        control={
          <Checkbox
            size={'large'}
            checked={selectedTraits.asset_traits.includes(el)}
            onChange={(event: ChangeEvent<HTMLInputElement>) => addOrRemoveSelectedTrait(el, 'asset_traits', event.target.checked)}
          />
        }/> : undefined
    ).filter(Boolean)
  }, [galleryConfig, traitsSearchValue, selectedTraits.asset_traits, addOrRemoveSelectedTrait])


  const [colorTraitsSearchValue, setColorTraitsSearchValue] = useState<string>('')

  const renderColorTraits = useMemo<ReactNode[]>(() => {
    if (!galleryConfig) return []
    return galleryConfig?.records_color_traits.map((el) =>
      el.includes(colorTraitsSearchValue) ? <FormControlLabel
        key={el}
        label={el}
        control={
          <Checkbox
            size={'large'}
            checked={selectedTraits.asset_color_traits.includes(el)}
            onChange={(event: ChangeEvent<HTMLInputElement>) => addOrRemoveSelectedTrait(el, 'asset_color_traits', event.target.checked)}
          />
        }/> : undefined
    ).filter(Boolean)
  }, [addOrRemoveSelectedTrait, colorTraitsSearchValue, galleryConfig, selectedTraits.asset_color_traits])


  return <Box>

    <ListComposition
      title={<>
        <Chip
          sx={{marginRight: STYLES_POLICY.spacing[1]}}
          variant={validationObject.asset_traits ? 'outlined' : 'filled'}
          color={validationObject.asset_traits ? 'primary' : 'success'}
          label={selectedTraits.asset_traits.length}/>
        Wybierz cechy stylizacji </>}
      shouldShowScrollArrow={renderTraits.length >= MIN_NUMBER_TO_SHOW_SCROLLABLE_ICON}
      searchValueSubscription={(searchValue) => {
        setTraitsSearchValue(searchValue)
      }}
    >
      {renderTraits}
    </ListComposition>

    <ListComposition
      title={<>
        <Chip
          sx={{marginRight: STYLES_POLICY.spacing[1]}}
          variant={validationObject.asset_color_traits ? 'outlined' : 'filled'}
          color={validationObject.asset_color_traits ? 'primary' : 'success'}
          label={selectedTraits.asset_color_traits.length}/>
        Wybierz kolorystykę stylizacji </>}
      shouldShowScrollArrow={renderColorTraits.length >= MIN_NUMBER_TO_SHOW_SCROLLABLE_ICON}
      searchValueSubscription={(searchValue) => {
        setColorTraitsSearchValue(searchValue)
      }}
    >
      {renderColorTraits}
    </ListComposition>

    <Typography variant={'body1'}></Typography>

  </Box>
}

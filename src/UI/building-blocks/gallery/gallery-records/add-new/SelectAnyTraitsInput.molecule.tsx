import * as React from 'react';
import {FormEventHandler, RefObject, useCallback, useEffect, useMemo, useState} from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Autocomplete, {createFilterOptions} from '@mui/material/Autocomplete';
import {FilterSelectedValuesAtom} from "../../../admin/user-list/user-list-filters/generics/FilterSelectedValues.atom";
import {Checkbox, ListItem, Typography} from "@mui/material";
import {Trait} from "../../../../../READONLY-shared-kernel/domain/gallery/gallery.types";
import {createTrait_IO} from "../../../../../domain/gallery/galleryIO.possibilities.api";
import {VALIDATION_POLICY} from "../../../../../READONLY-shared-kernel/policies/validation.policy";
import {getAppIcon} from "../../../../../domain/app-icons/adapters/MuiIcons.adapter";
import {GalleryConfig} from "../../../../../READONLY-shared-kernel/models/db_models";


const icon = getAppIcon.CheckboxUnchecked({fontSize: 'large'})
const checkedIcon = getAppIcon.CheckboxChecked({fontSize: 'large'})


const filter = createFilterOptions<Trait>();

export const SelectAnyTraitsInputMolecule = (
  {
    galleryConfig,
    valuesRef,
    traitsType,
    disableAdding = false,
  }: {
    galleryConfig: GalleryConfig | undefined
    valuesRef: RefObject<string[]>
    traitsType: 'records_traits' | 'records_color_traits'
    disableAdding?: boolean

  }
) => {

  const [values, setValues] = useState<string[]>([])

  useEffect(() => {
    if (valuesRef.current) {
      valuesRef.current = values
    }
  }, [values, valuesRef]);

  const addSelectedValue = useCallback((value: Trait) => {
    if (values.includes(value)) {
      return void undefined
    }
    setValues((prev) => [...prev, value])
  }, [setValues, values])


  const [localValue, setLocalValue] = useState<Trait>('')


  const [createNewValueViewOpenState, setCreateNewValueViewOpenState] = useState(false)
  const [creatingNewValueInProgressState, setCreatingNewValueInProgressState] = useState(false)

  const [possibleTraits, setPossibleTraits] = useState<Trait[]>([])

  const getAndUpdatePossibleTraits = useCallback(async (resolve?: (traits: Trait[]) => void) => {
    if (!galleryConfig) {
      return void undefined
    }
    setPossibleTraits(galleryConfig[traitsType] ?? [])
    resolve && resolve(galleryConfig[traitsType] ?? [])
  }, [galleryConfig, traitsType])

  useEffect(() => {
    void getAndUpdatePossibleTraits()
  }, [getAndUpdatePossibleTraits])

  const isExistingInCollection = useCallback((value: string) =>
    possibleTraits.includes(value), [possibleTraits])

  const handleCloseCreateNewValueView = () => {
    setLocalValue('')
    setCreateNewValueViewOpenState(false)
  }

  const openCreateNewValueView = useCallback((optionValue: Trait) => {
    setCreateNewValueViewOpenState(true)
    requestAnimationFrame(() => {
      setLocalValue(VALIDATION_POLICY.utils.normalizeStringCapitalizedWords(optionValue))
    })
  }, [])


  const handleCreateNew: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()
    setCreatingNewValueInProgressState(true)
    const normalizedValue = VALIDATION_POLICY.utils.normalizeStringCapitalizedWords(localValue)

    await getAndUpdatePossibleTraits(
      async (traits) => {
        if (traits.includes(normalizedValue)) {
          addSelectedValue(normalizedValue)
        } else {
          await createTrait_IO(
            {
              trait: traitsType === 'records_traits' ? normalizedValue : '',
              color_trait: traitsType === 'records_color_traits' ? normalizedValue : ''
            },
            async (response) => {
              addSelectedValue(normalizedValue)
              setPossibleTraits((prev) => [...prev, normalizedValue])
            },
            async (error) => {
            })
        }
      })
    handleCloseCreateNewValueView()
    setCreatingNewValueInProgressState(false)
  }


  const getInputLabel = useMemo(() => {
    if (traitsType === 'records_traits') {
      return "Cechy stylizacji"
    }
    if (traitsType === 'records_color_traits') {
      return "Kolorystyka"
    }
  }, [traitsType])


  const getTitle = useMemo(() => {
    if (traitsType === 'records_traits') {
      return "Dodaj nową cechę"
    }
    if (traitsType === 'records_color_traits') {
      return "Dodaj nową kolorystykę"
    }
  }, [traitsType])


  return (
    <>
      <Autocomplete
        options={possibleTraits}
        clearOnBlur
        disableCloseOnSelect
        selectOnFocus
        handleHomeEndKeys
        multiple
        slotProps={{
          popper: {
            placement: 'top'
          }
        }}
        disabled={creatingNewValueInProgressState}

        value={values}
        onChange={(_, newValues) => {
          setValues(newValues)
        }}

        onInputChange={(_, newValue) => {
          setLocalValue(newValue)
        }}

        filterOptions={(options, params) => {
          const filtered = filter(options, params)
          const {inputValue} = params
          const isOptionExistsInCollection = isExistingInCollection(inputValue)
          // If not empty and non exists after filtering push to list in dropdown.
          if (params.inputValue !== '' && !isOptionExistsInCollection) {
            filtered.push(params.inputValue)
          }
          if (params.inputValue === '') {
            filtered.push('')
          }
          return filtered
        }}

        renderOption={(props, optionValue, {selected}) => {
          const {key, ...optionProps} = props;
          const isOptionExistsInCollection = isExistingInCollection(optionValue)
          if (isOptionExistsInCollection) {
            return (
              <ListItem key={key} {...optionProps}
                        style={{position: 'relative'}}>
                <Checkbox
                  disabled={true}
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{marginRight: 8}}
                  checked={selected}
                />
                {optionValue}
              </ListItem>
            )
          } else {
            return disableAdding ? undefined : (
              <ListItem dense={true} key={key} {...optionProps}
                        onClick={() => openCreateNewValueView(optionValue)}>
                <Checkbox
                  sx={{display: 'none'}}
                  disabled={true}
                  icon={icon}
                  checkedIcon={checkedIcon}
                  checked={selected}
                />
                {getAppIcon.AddNew({fontSize: 'large', sx: {margin: 'auto'}})}
                {optionValue}
              </ListItem>
            )
          }
        }}

        renderValue={(selected) => (
          <FilterSelectedValuesAtom values={selected}/>
        )}
        renderInput={(params) =>
          <TextField
            {...params}
            variant={'outlined'}
            label={getInputLabel}
          />}
      />


      <Dialog
        fullWidth
        open={createNewValueViewOpenState}
        onClose={handleCloseCreateNewValueView}
        disableEscapeKeyDown
      >
        <DialogTitle variant={'subtitle2'}>{getTitle}</DialogTitle>
        <form onSubmit={handleCreateNew}>
          <DialogContent>
            {localValue ? <Typography variant={'body1'} component={'span'}>Tak będzie wyglądała nowa
              cecha: <FilterSelectedValuesAtom
                values={[VALIDATION_POLICY.utils.normalizeStringCapitalizedWords(localValue)]}/></Typography> : undefined}
            <TextField
              autoFocus
              value={localValue}
              onChange={(event) =>
                setLocalValue(event.target.value)
              }
              type={'text'}
              variant={'standard'}
              name={'value'}
            />

            <DialogContentText>
              Będzie to również nową kategorią w galerii.
            </DialogContentText>

          </DialogContent>
          <DialogActions>
            <Button variant={'outlined'} onClick={handleCloseCreateNewValueView}>Zamknij</Button>
            <Button disabled={!localValue || creatingNewValueInProgressState} type={'submit'}>UŻYJ</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

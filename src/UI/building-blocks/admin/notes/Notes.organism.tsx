import {Stack} from '@mui/material'
import {freezeThreadAndWait, useDebounce, useFireOnMountHook} from '@msalek/utils'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import {EditorContent, EditorEvents, useEditor} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {ReactNode, startTransition, useCallback, useEffect, useState} from 'react'
import {getNotes_IO, saveNote_IO, setMainNote_IO} from '../../../../domain/admin/adminActionsIO.possibilities.api'
import {getDateForUI} from '../../../features/UI.utils.api'
import {IDType} from '../../../../READONLY-shared-kernel/application/application.types'
import {ADMIN_DTO_API_V1} from '../../../../READONLY-shared-kernel/models/admin/admin.dto'
import {Admin} from '../../../../READONLY-shared-kernel/models/db_models'
import {ConfirmButtonAtom} from '../../_wide-use-components/ConfirmButton.atom'
import {NotesMenuAtom, NotesMenuBarAtom} from './Menus.atom'
// https://tiptap.dev/docs/editor/getting-started/overview


export const NotesOrganism = (): ReactNode => {

  const [value, setValue] = useState('')

  const debouncedValue = useDebounce<Admin['notes']>(
    value,
    1000)


  const setCallback = useCallback(
    async ({editor}: EditorEvents['update']) => {
      const newValue = editor.getHTML()
      setValue(newValue)
    },
    [])


  const [saveMarkVisible, setSaveMarkVisible] = useState<boolean>(false)

  const [fetchedVersions, setFetchedVersions] = useState<ADMIN_DTO_API_V1['GET_NOTES']['RESPONSE']['versions']>([])
  const [initialContent, setInitialContent] = useState('')
  const [selectedNoteID, setSelectedNoteID] = useState<IDType | null>(null)

  const [isButtonVisible, setIsButtonVisible] = useState<boolean>(!!selectedNoteID)
  const [isAutocompleteDisabled, setIsAutocompleteDisabled] = useState<boolean>(true)


  const getNotesCallback = useCallback(
    async (id?: ADMIN_DTO_API_V1['GET_NOTES']['RESPONSE']['versions'][0]['id']) => {
      await getNotes_IO(
        {id},
        async (res) => {
          startTransition(async () => {
            setInitialContent(res.data.notes)
            setFetchedVersions(res.data.versions)
            if (res.data.versions.length === 0) {
              setIsAutocompleteDisabled(true)
            } else {
              setIsAutocompleteDisabled(false)
            }
          })
        },
        async (error) => {
        })

    },
    [])


  const setMainNoteCallback = useCallback(
    () => {
      if (!selectedNoteID) {
        return void undefined
      }
      void void setMainNote_IO(
        {id: selectedNoteID},
        async (res) => {
          void getNotesCallback()
          setIsButtonVisible(false)
        },
        async (error) => {
        })

    },
    [selectedNoteID, getNotesCallback])


  useEffect(
    () => {
      if (debouncedValue) {
        setIsAutocompleteDisabled(true)
        void saveNote_IO(
          {notes: debouncedValue},
          async (res) => {
            await getNotesCallback()
            setIsAutocompleteDisabled(false)
            setSaveMarkVisible(true)
            await freezeThreadAndWait(6000)
            setSaveMarkVisible(false)

          },
          async (error) => {

          })

        setIsButtonVisible(false)
      }
    },
    [debouncedValue, getNotesCallback])


  const editor = useEditor({
    immediatelyRender: true,
    extensions: [StarterKit],
    onUpdate: setCallback
  })


  useEffect(
    () => {
      startTransition(async () => {
        editor.commands.setContent(initialContent)
      })
    },
    [editor,
      initialContent])


  useFireOnMountHook(getNotesCallback)


  if (!editor) {
    return null
  }

  return (
    <Stack>
      <NotesMenuAtom editor={editor}/>
      <NotesMenuBarAtom editor={editor}/>
      <EditorContent editor={editor}/>

      <Typography
        variant={'h3'}
        sx={{
          color: (theme) => theme.palette.success.dark,
          pointerEvents: 'none',
          position: 'sticky',
          marginRight: 1,
          bottom: 15,
          textAlign: 'right',
          transition: 'opacity 300ms ease',
          opacity: saveMarkVisible
            ? 1
            : 0
        }}>Zapisano.</Typography>


      <Stack sx={{
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 2,
        flexWrap: 'wrap'
      }}>

        <Autocomplete
          freeSolo
          disabled={isAutocompleteDisabled}
          options={fetchedVersions}
          getOptionLabel={(option) => {
            const typedOption = option as ADMIN_DTO_API_V1['GET_NOTES']['RESPONSE']['versions'][0]
            return getDateForUI(typedOption.created_at)
          }}
          onChange={(event: any, newValue) => {
            const typedValue = newValue as ADMIN_DTO_API_V1['GET_NOTES']['RESPONSE']['versions'][0]
            getNotesCallback(typedValue.id)
            setSelectedNoteID(typedValue.id)
            setIsButtonVisible(true)
          }}
          id="notes-versions"
          sx={{width: 280}}
          disableClearable
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search for previous version"
            />)}
        />

        <ConfirmButtonAtom
          confirmationText={'ZAPINSZ TERANZ'}
          passProps={{
            color: 'info',
            variant: 'contained',
            sx: {
              minWidth: '200px',

              visibility: isButtonVisible
                ? 'visible'
                : 'hidden'
            }
          }}
          actionText={'Ustaw jako główną'}
          actionCallback={setMainNoteCallback}
        />

      </Stack>


    </Stack>)
}
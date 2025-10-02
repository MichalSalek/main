import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {DefaultSize, ExtendedSettings, FixedCropper, FixedCropperRef, ImageRestriction} from 'react-advanced-cropper';
import 'react-advanced-cropper/dist/style.css'
import {Stack} from '@mui/material';
import {STYLES_POLICY} from '../../../../styles/styles.policy';
import {useSetActonButtonsHook} from '../../../../application-hooks/useSetActonButtons.hook';
// https://www.npmjs.com/package/react-advanced-cropper
// https://advanced-cropper.github.io/react-advanced-cropper/docs/guides/recipes/
import {reportIssue} from '../../../../../application/error-debugger/errorHandler.possibilities.api';
import {
  IMAGE_ASPECT_RATIO,
  IMAGE_QUALITY,
  IMAGE_TYPE,
  MAX_UPLOAD_IMAGE_WIDTH_IN_PX
} from '../../../../../domain/gallery/gallery-records.config';
import {useLoadImageHook} from './useLoadImage.hook';
import {getAppIcon} from '../../../../../domain/app-icons/adapters/MuiIcons.adapter';
import {useSetLoadingIcon} from '../../../floating-partials/app-menu/dynamicMenu.possibilities.api';
import {freezeThreadAndWait} from '@msalek/utils';
import {
  turnOffAppBusyLoader,
  turnOnAppBusyLoader
} from '../../../../../application/app-loaders/appLoaders.possibilities.api';
import {createGalleryRecord_IO, uploadPhotoAsset_IO} from '../../../../../domain/gallery/galleryIO.possibilities.api';
import {useAppSelector} from '../../../../../application/store/store';
import {STORE_SEL_user_currentUser} from '../../../../../domain/user/user.read';
import {pushNewSnackbar} from '../../../../../application/app-snackbar/appSnackbar.possibilities.api';
import {getIDMark} from '../../../../../READONLY-shared-kernel/domain/gallery/gallery.utils';
import {
  cloudinaryUploadPreset
} from '../../../../../READONLY-shared-kernel/domain/adapters/cloudinary/cloudinary.config';
import {CLOUDINARY_ASSET_FOLDER} from '../../../../../domain/gallery/cloudinary-adapter/cloudinary.config';
import {GalleryRecordAtom} from '../../GalleryRecord.atom';
import {useRouter} from 'next/router';
import {ROUTES_FRONT} from '../../../../../READONLY-shared-kernel/domain/routing/routing.config';
import {EditTraitsOrganism} from '../traits/EditTraits.organism';
import {TraitsPartial} from '../../../../../domain/gallery/traits.types';
import {noTraitDefaultEmptyValue, traitsPartialClearedValues} from '../../../../../domain/gallery/traits.config';
import {VALIDATION_POLICY} from '../../../../../READONLY-shared-kernel/policies/validation.policy';
import {EVENT_INFO_TYPE} from '../../../../../READONLY-shared-kernel/domain/commands-and-queries/cqrs.types';


const defaultSize: DefaultSize<ExtendedSettings<{}>> = ({imageSize, visibleArea}) => {
  return {
    width: visibleArea?.width || (imageSize).width,
    height: visibleArea?.height || (imageSize).height,
  }
}

export const AddNewPhotoOrganism = () => {
  const currentUser = useAppSelector(STORE_SEL_user_currentUser)
  const router = useRouter()

  const [croppedImage, setCroppedImage] = useState<Blob | null>(null)
  const [croppedImageSrc, setCroppedImageSrc] = useState<string | undefined>()
  const [processStep, setProcessStep] = useState<'edit' | 'preview' | 'done'>('edit')
  const [cropperVisibility, setCropperVisibility] = useState<boolean>(false)


  const [isEditTraitsViewOpen, setIsEditTraitsViewOpen] = useState(false)
  const [selectedTraits, setSelectedTraits] = useState<TraitsPartial>(traitsPartialClearedValues)


  const isTraitsSectionPassValidation = useMemo<boolean>(() => (
    selectedTraits.asset_traits.length > 0 && selectedTraits.asset_color_traits.length > 0
  ), [selectedTraits.asset_color_traits.length, selectedTraits.asset_traits.length])


  const cropperRef = useRef<FixedCropperRef>(null)

  const setLoadingIcon = useSetLoadingIcon()

  const setActionButtons = useSetActonButtonsHook()


  const ACTION_BUTTONS__CLEAR = useCallback(() => {
    setActionButtons([])
  }, [setActionButtons])


  const exitFromCropperCallback = useCallback(() => {
    setCropperVisibility(false)
    turnOffAppBusyLoader()
  }, [])


  const ACTION_BUTTONS__PREVIEW_SCREEN = useCallback(() => {
    setActionButtons([
      {
        title: 'WRÓĆ',
        icon: getAppIcon.Back,
        action: () => {
          setProcessStep('edit')
        }
      },
      {
        title: 'DODAJ',
        icon: getAppIcon.Accept,
        action: async () => {
          if (!currentUser?.user_id) {
            reportIssue('UploadAction no user.', [currentUser, croppedImageSrc])
            return void undefined
          }

          if (!croppedImage) {
            reportIssue('UploadAction no image.', [currentUser, croppedImageSrc])
            return void undefined
          }
          pushNewSnackbar('Przetwarzanie zdjęcia, jeszcze chwila...', 'info')

          setLoadingIcon()
          const uploadPhotoFormData = new FormData()
          uploadPhotoFormData.append('file', croppedImage, getIDMark(currentUser.user_id))
          uploadPhotoFormData.append('asset_folder', CLOUDINARY_ASSET_FOLDER(currentUser.user_id))
          uploadPhotoFormData.append('upload_preset', cloudinaryUploadPreset)
          uploadPhotoFormData.append('resource_type', 'image')

          await uploadPhotoAsset_IO(uploadPhotoFormData,
            async (response) => {

              await createGalleryRecord_IO({
                  asset_url: response.secure_url,
                  ...selectedTraits
                },
                async (response) => {
                  setProcessStep('done')
                },
                async (error) => {
                  setProcessStep('edit')
                  Object.values(error.data ?? {}).forEach((message) => {
                    message && pushNewSnackbar(message, 'error')
                  })

                })
            },
            async (error) => {
              pushNewSnackbar('INTERNET_CONNECTION_PROBLEM' as EVENT_INFO_TYPE, 'error')
            })

        }
      }])
  }, [croppedImage, currentUser?.user_id, selectedTraits, setActionButtons, setLoadingIcon])


  const ACTION_BUTTONS__ACCEPT = useCallback(() => {
    if (!croppedImageSrc) {
      return void undefined // Do not set Accept button when is no image added yet.
    }
    setActionButtons([{
      title: 'AKCEPTUJ',
      action: () => {
        if (!isTraitsSectionPassValidation) {
          const validationObj = VALIDATION_POLICY.validators.createGalleryRecord({
            asset_url: '',
            ...selectedTraits
          })

          validationObj.asset_color_traits && pushNewSnackbar(validationObj.asset_color_traits, 'error')
          validationObj.asset_traits && pushNewSnackbar(validationObj.asset_traits, 'error')

        } else {
          setProcessStep('preview')
        }
      },
      icon: getAppIcon.Go
    }])
  }, [croppedImageSrc, isTraitsSectionPassValidation, selectedTraits, setActionButtons])


  useEffect(() => {
    void selectedTraits // Update ACTION_BUTTONS__ACCEPT closure at selectedTraits change.
    ACTION_BUTTONS__ACCEPT()
  }, [ACTION_BUTTONS__ACCEPT, selectedTraits]);


  const ACTION_BUTTONS__CROP = useCallback(() => {
    setActionButtons([{
      title: 'CROP',
      icon: getAppIcon.Crop,
      action: async () => {
        if (!cropperRef.current) {
          reportIssue('CROPPER', 'No cropperRef onCrop')
          exitFromCropperCallback()
          return void undefined
        }
        turnOnAppBusyLoader()
        setLoadingIcon()
        await freezeThreadAndWait(50)
        await freezeThreadAndWait(50)

        const imageFromRef = cropperRef.current.getCanvas({maxWidth: MAX_UPLOAD_IMAGE_WIDTH_IN_PX})
        if (!imageFromRef) {
          reportIssue('CROPPER', 'No image available')
          exitFromCropperCallback()
          return void undefined
        }

        imageFromRef.toBlob(blob => {
          if (!blob) {
            reportIssue('CROPPER', 'No blob')
            exitFromCropperCallback()
            return void undefined
          }
          const imageElementSrc = URL.createObjectURL(blob);
          setCroppedImage(blob)
          setCroppedImageSrc(imageElementSrc)
          ACTION_BUTTONS__ACCEPT()
        }, IMAGE_TYPE, IMAGE_QUALITY)

        exitFromCropperCallback()
      }
    }])
  }, [ACTION_BUTTONS__ACCEPT, exitFromCropperCallback, setActionButtons, setLoadingIcon])


  const turnOnCropperCallback = useCallback(() => {
    setCropperVisibility(true)
    ACTION_BUTTONS__CROP()
  }, [ACTION_BUTTONS__CROP])

  const {
    loadedImageSrc,
    loadPhotoActionCallback,
    onLoadImage,
    inputRef,
    clearLoadedImage
  } = useLoadImageHook({onLoadAction: turnOnCropperCallback})


  const resetToInitialStep = useCallback(() => {
    setProcessStep('edit')
    setCroppedImage(null)
    setCroppedImageSrc(undefined)
    clearLoadedImage()
    setCropperVisibility(false)
    setSelectedTraits(traitsPartialClearedValues)
    ACTION_BUTTONS__CLEAR()
  }, [ACTION_BUTTONS__CLEAR, clearLoadedImage])


  const ACTION_BUTTONS__DONE_SCREEN = useCallback(() => {
    setActionButtons([
      {
        title: 'KOLEJNE',
        icon: getAppIcon.Restart,
        action: async () => {
          resetToInitialStep()
        }
      },
      {
        title: 'GALERIA',
        icon: getAppIcon.Photos,
        action: async () => {
          await router.push(ROUTES_FRONT.GALLERY)
        }
      }])
  }, [resetToInitialStep, router, setActionButtons])

  useEffect(() => {
    processStep === 'edit' && ACTION_BUTTONS__ACCEPT()

    processStep === 'preview' && ACTION_BUTTONS__PREVIEW_SCREEN()

    processStep === 'done' && ACTION_BUTTONS__DONE_SCREEN()

  }, [ACTION_BUTTONS__ACCEPT, ACTION_BUTTONS__DONE_SCREEN, ACTION_BUTTONS__PREVIEW_SCREEN, processStep])

  useEffect(() => {
    resetToInitialStep()
  }, [resetToInitialStep])

  // useEffect(() => {
  //   if (croppedImage) {
  //     goToPreviewStep()
  //   }
  // }, [croppedImage, goToPreviewStep])


  return (<Stack
    sx={{
      marginLeft: STYLES_POLICY.containerGutter[0],
      marginRight: STYLES_POLICY.containerGutter[0]
    }}
  >
    <input
      ref={inputRef}
      type='file'
      hidden={true}
      accept='image/*'
      onChange={onLoadImage}
    />

    {cropperVisibility ?

      <FixedCropper
        canvas={true}
        ref={cropperRef}
        src={loadedImageSrc}
        style={{
          height: `calc(100dvh - calc(${STYLES_POLICY.appBarDimension} * 2) - 50px)`
        }}
        defaultSize={defaultSize}
        stencilSize={defaultSize}
        stencilProps={{
          aspectRatio: IMAGE_ASPECT_RATIO,
          handlers: false,
          lines: true,
          movable: false,
          resizable: false,
          grid: true,
        }}
        imageRestriction={ImageRestriction.stencil}
      />

      :

      <GalleryRecordAtom
        loadPhotoActionCallback={processStep === 'edit' ? loadPhotoActionCallback : undefined}
        cropActionCallback={processStep === 'edit' ? turnOnCropperCallback : undefined}
        editTraitsCallback={processStep === 'edit' ? () => setIsEditTraitsViewOpen(true) : undefined}
        shouldShowCardContent={!!croppedImageSrc}
        el={{
          asset_url: croppedImageSrc,
          asset_traits: selectedTraits.asset_traits.length > 0 ? selectedTraits.asset_traits : [noTraitDefaultEmptyValue],
          asset_color_traits: selectedTraits.asset_color_traits.length > 0 ? selectedTraits.asset_color_traits : [noTraitDefaultEmptyValue],
        }}
      />
    }

    <EditTraitsOrganism
      selectedTraits={selectedTraits}
      setSelectedTraits={setSelectedTraits}
      isViewOpen={isEditTraitsViewOpen}
      handleCloseView={() => setIsEditTraitsViewOpen(false)}
    />


  </Stack>)
}

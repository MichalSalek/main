import {useCallback, useEffect, useRef, useState} from 'react';
import {DefaultSize, ExtendedSettings, FixedCropper, FixedCropperRef, ImageRestriction} from 'react-advanced-cropper';
import 'react-advanced-cropper/dist/style.css'
import scss from './cropper.module.scss'
import {Button, Stack, Step, StepContent, StepLabel, Stepper, Typography} from '@mui/material';
import {STYLES_POLICY} from '../../../../../READONLY-shared-kernel/policies/styles.policy';
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
import {SelectAnyTraitsInputMolecule} from './SelectAnyTraitsInput.molecule';
import {LinkAtom} from '../../../_wide-use-components/Link.atom';
import {
  createGalleryRecord_IO,
  deleteAssetFromVendor_IO,
  uploadPhotoAsset_IO
} from '../../../../../domain/gallery/galleryIO.possibilities.api';
import {useAppSelector} from '../../../../../application/store/store';
import {STORE_SEL_user_currentUser} from '../../../../../domain/user/user.read';
import {pushNewSnackbar} from '../../../../../application/app-snackbar/appSnackbar.possibilities.api';
import {Trait} from '../../../../../READONLY-shared-kernel/domain/gallery/gallery.types';
import {CloudinaryType} from '../../../../../domain/gallery/cloudinary-adapter/cloudinary.types';
import {getIDMark} from '../../../../../READONLY-shared-kernel/domain/gallery/gallery.utils';
import {ROUTES_FRONT} from '../../../../../READONLY-shared-kernel/domain/routing/routing.config';
import {useGetGalleryConfig} from '../../hooks/useGetGalleryConfig.hook';
import {
  cloudinaryUploadPreset
} from '../../../../../READONLY-shared-kernel/domain/adapters/cloudinary/cloudinary.config';
import {CLOUDINARY_ASSET_FOLDER} from '../../../../../domain/gallery/cloudinary-adapter/cloudinary.config';

const steps = [
  {
    label: 'Dodawanie zdjęcia',
    description: <span>Wybierz obraz z pamięci swojego urządzenia.</span>,
  },
  {
    label: 'Dostosowanie',
    description: <span>Cropper umożliwi Ci wybranie odpowiedniego rozmiaru. <br/>
    Gdy to zrobisz, przejdź dalej.</span>,
  },
  {
    label: 'Wybór cech',
    description: `W tym kroku wybierz cechy do zdjęcia.
    Dzięki nim będziesz mógł tworzyć kategorie oraz filtrować swoją galerię.`,
  },
  {
    label: 'Zapis zdjęcia do galerii',
    description: 'Gotowe!',
  }
]


const defaultSize: DefaultSize<ExtendedSettings<{}>> = ({imageSize, visibleArea}) => {
  return {
    width: visibleArea?.width || (imageSize).width,
    height: visibleArea?.height || (imageSize).height,
  }
}

export const AddNewPhotoOrganism = () => {
  const currentUser = useAppSelector(STORE_SEL_user_currentUser)

  const [croppedImage, setCroppedImage] = useState<Blob | null>(null)
  const [croppedImageSrc, setCroppedImageSrc] = useState<string | null>(null)
  const [processStep, setProcessStep] = useState<0 | 1 | 2 | 3>(0)
  const [showStepper, setShowStepper] = useState<boolean>(true)
  const [cropperSwitched, setCropperSwitched] = useState<boolean>(false)
  const selectedTraitsRef = useRef<Trait[]>([])
  const selectedColorTraitsRef = useRef<Trait[]>([])

  const {galleryConfig} = useGetGalleryConfig()

  const cropperRef = useRef<FixedCropperRef>(null)

  const onTurnOffCropperCallback = useCallback(() => {
    setCropperSwitched(false)
    setShowStepper(true)
  }, [])

  const setLoadingIcon = useSetLoadingIcon()

  const setActionButtons = useSetActonButtonsHook()


  const onTurnOnCropperCallback = useCallback(() => {
    setCropperSwitched(true)
    setActionButtons([{
      title: 'CROP',
      action: async () => {
        if (!cropperRef.current) {
          reportIssue('CROPPER', 'No cropperRef onCrop')
          return void undefined
        }
        turnOnAppBusyLoader()
        setLoadingIcon()
        await freezeThreadAndWait(150)
        await freezeThreadAndWait(150)

        const imageFromRef = cropperRef.current.getCanvas({maxWidth: MAX_UPLOAD_IMAGE_WIDTH_IN_PX})
        if (!imageFromRef) {
          reportIssue('CROPPER', 'No image available')
          return void undefined
        }

        imageFromRef.toBlob(blob => {
          if (!blob) {
            reportIssue('CROPPER', 'No blob')
            return void undefined
          }
          const imageElementSrc = URL.createObjectURL(blob);
          setCroppedImage(blob)
          setCroppedImageSrc(imageElementSrc)
        }, IMAGE_TYPE, IMAGE_QUALITY)

        onTurnOffCropperCallback()
        turnOffAppBusyLoader()

      },
      icon: getAppIcon.Crop()
    }])
    setShowStepper(false)
  }, [onTurnOffCropperCallback, setActionButtons, setLoadingIcon])

  const {
    loadedImageSrc,
    loadPhotoActionCallback,
    onLoadImage,
    inputRef,
    clearLoadedImage
  } = useLoadImageHook({onLoadAction: onTurnOnCropperCallback})


  const setupProcessStep3 = useCallback(() => {
    setProcessStep(3)
    setActionButtons([])
  }, [setActionButtons])


  const memoizedResponseForErrorCase = useRef<CloudinaryType | null>(null)

  const setupProcessStep2 = useCallback(() => {
    setProcessStep(2)
    setActionButtons([{
      title: 'UPLOAD',
      action: async () => {
        if (!croppedImage || !currentUser?.user_id) {
          console.error('UploadAction early exit.')
          return void undefined
        }

        setLoadingIcon()
        const uploadPhotoFormData = new FormData()
        uploadPhotoFormData.append('file', croppedImage, getIDMark(currentUser.user_id))
        uploadPhotoFormData.append('asset_folder', CLOUDINARY_ASSET_FOLDER(currentUser.user_id))
        uploadPhotoFormData.append('upload_preset', cloudinaryUploadPreset)
        uploadPhotoFormData.append('resource_type', 'image')

        // After error way, use memoized asset instead if uploading doubled one.
        if (memoizedResponseForErrorCase.current) {
          await createGalleryRecord_IO({
              asset_url: memoizedResponseForErrorCase.current.secure_url,
              traits: selectedTraitsRef.current,
              color_traits: selectedColorTraitsRef.current
            },
            async (response) => {
              memoizedResponseForErrorCase.current = null
              setupProcessStep3()
            },
            async (error) => {
              setupProcessStep2()
            })

          // Usual success way
        } else {
          await uploadPhotoAsset_IO(uploadPhotoFormData,
            async (response) => {
              void pushNewSnackbar('Przetwarzanie zdjęcia, jeszcze chwila...', 'info')
              memoizedResponseForErrorCase.current = response
              await createGalleryRecord_IO({
                  asset_url: response.secure_url,
                  traits: selectedTraitsRef.current,
                  color_traits: selectedColorTraitsRef.current
                },
                async (response) => {
                  memoizedResponseForErrorCase.current = null
                  setupProcessStep3()
                },
                async (error) => {
                  setupProcessStep2()
                })
            },
            async (error) => {
              setupProcessStep2()
            })
        }
      },
      icon: getAppIcon.Upload()
    }])
  }, [setActionButtons, croppedImage, currentUser, setLoadingIcon, setupProcessStep3])


  useEffect(() => {
    return () => {
      if (memoizedResponseForErrorCase.current) {
        void deleteAssetFromVendor_IO({asset_id: memoizedResponseForErrorCase.current.public_id},
          async (response) => {
          },
          async (error) => {
          })
      }
    }
  }, []);


  const setupProcessStep1 = useCallback(() => {
    setProcessStep(1)
    setActionButtons([{
      title: 'AKCEPTUJ',
      action: () => {
        setupProcessStep2()
      },
      icon: getAppIcon.Accept()
    }])
  }, [setActionButtons, setupProcessStep2])


  const setupProcessStep0 = useCallback(() => {
    setProcessStep(0)
    setCroppedImage(null)
    setCroppedImageSrc(null)
    clearLoadedImage()
    setActionButtons([{
      title: 'Wczytaj zdjęcie',
      action: loadPhotoActionCallback,
      icon: getAppIcon.AddPhoto()
    }])
  }, [clearLoadedImage, loadPhotoActionCallback, setActionButtons])


  useEffect(() => {
    setupProcessStep0()
    return () => {
      setActionButtons([])
    }
  }, [setActionButtons, setupProcessStep0])

  useEffect(() => {
    if (croppedImage) {
      setupProcessStep1()
    }
  }, [croppedImage, setupProcessStep1])


  return (<Stack sx={{paddingBottom: STYLES_POLICY.spacing[5]}}>
    <input
      ref={inputRef}
      type='file'
      hidden={true}
      accept='image/*'
      onChange={onLoadImage}
    />

    <Typography variant={'h1'}>
      Dodaj nowe zdjęcie do swojej galerii.
    </Typography>


    {loadedImageSrc && (
      <Stack sx={{
        gap: STYLES_POLICY.spacing[1]
      }}>
        {!cropperSwitched &&
            <Stack sx={{alignItems: 'center'}}>
                <img
                    src={croppedImageSrc || loadedImageSrc}
                    alt='added-image'
                    className={scss.previewImage}
                    style={{
                      background: STYLES_POLICY.backgroundColor[1],
                      marginTop: STYLES_POLICY.spacing[2],
                      marginBottom: STYLES_POLICY.spacing[2]
                    }}
                />

            </Stack>}

        {cropperSwitched &&
            <FixedCropper
                canvas={true}
                ref={cropperRef}
                src={loadedImageSrc}
                className={scss.previewImage}
                defaultSize={defaultSize}
                stencilSize={{
                  width: 320,
                  height: 250
                }}
                stencilProps={{
                  aspectRatio: IMAGE_ASPECT_RATIO,
                  handlers: false,
                  lines: true,
                  movable: false,
                  resizable: false,
                  grid: true
                }}
                imageRestriction={ImageRestriction.stencil}
            />
        }
      </Stack>
    )}


    {processStep === 1 && !cropperSwitched && loadedImageSrc ? <Button
      onClick={loadPhotoActionCallback}
      variant={'outlined'}
      endIcon={getAppIcon.AddPhoto()}>WCZYTAJ INNE ZDJĘCIE</Button> : null}

    {processStep === 1 && !cropperSwitched && croppedImage ? <Button
      onClick={onTurnOnCropperCallback}
      variant={'outlined'}
      endIcon={getAppIcon.Crop()}>CROP AGAIN</Button> : null}


    {processStep === 2 ?
      <SelectAnyTraitsInputMolecule galleryConfig={galleryConfig} valuesRef={selectedTraitsRef}
                                    traitsType={'records_traits'}/> : null}

    {processStep === 2 ?
      <SelectAnyTraitsInputMolecule galleryConfig={galleryConfig} valuesRef={selectedColorTraitsRef}
                                    traitsType={'records_color_traits'}/> : null}

    {processStep === 2 ?
      <Typography>W <LinkAtom omitButtonElement>panelu zarządzania</LinkAtom> możesz również usuwać niepotrzebne cechy.</Typography> : null}


    {showStepper ? <Stepper activeStep={processStep} orientation="vertical" sx={{
      margin: STYLES_POLICY.spacing[4]
    }}>
      {steps.map((step, index) => (
        <Step key={step.label}>
          <StepLabel>
            <Typography variant={'h3'}>{step.label}</Typography>
          </StepLabel>
          <StepContent>
            <Typography variant={'body1'}>{step.description}</Typography>
          </StepContent>

        </Step>
      ))}
    </Stepper> : null}


    {processStep === 2 ? <Button
      sx={{padding: STYLES_POLICY.spacing[4]}}
      onClick={setupProcessStep1}
      variant={'text'}
      startIcon={getAppIcon.Back()}>Wróć do wyboru zdjęcia</Button> : null}


    {processStep === 3 ? <Stack gap={STYLES_POLICY.spacing[4]}>

      <Button
        onClick={setupProcessStep0}
        variant={'contained'}
        endIcon={getAppIcon.AddPhoto()}>DODAJ KOLEJNE ZDJĘCIE</Button>

      <LinkAtom route={ROUTES_FRONT.GALLERY}>IDŹ DO GALERII</LinkAtom>

    </Stack> : null}


  </Stack>)
}

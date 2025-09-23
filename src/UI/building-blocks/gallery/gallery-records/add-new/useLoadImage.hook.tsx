import {ChangeEvent, useCallback, useEffect, useRef, useState} from 'react';
import {useSetLoadingIcon} from '../../../floating-partials/app-menu/dynamicMenu.possibilities.api';
import {pushNewSnackbar} from '../../../../../application/app-snackbar/appSnackbar.possibilities.api';
import {
  turnOffAppBusyLoader,
  turnOnAppBusyLoader
} from '../../../../../application/app-loaders/appLoaders.possibilities.api';


type Props = {
  onLoadAction: () => void
}

export const useLoadImageHook = ({onLoadAction}: Props) => {

  const inputRef = useRef<HTMLInputElement>(null)
  const loadPhotoActionCallback = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }, [])

  const setLoadingIcon = useSetLoadingIcon()

  const [loadedImageSrc, setLoadedImageSrc] = useState<string | null>(null)

  const clearLoadedImage = useCallback(() => setLoadedImageSrc(null), [])

  const onLoadImage = (event: ChangeEvent<HTMLInputElement>) => {
    turnOnAppBusyLoader()
    setLoadingIcon()

    // Reference to the DOM input element
    const {files} = event.target;

    // Ensure that you have a file before attempting to read it
    if (!files || !files[0]) {
      return void undefined
    }
    // console.dir(event.target)
    // console.dir(files)
    // console.dir(files![0])
    const singleImage = files![0]

    // check if the file selected is not an image file
    if (!singleImage.type.includes('image')) {
      pushNewSnackbar('Dozwolone są jedynie obrazy.', 'warning')
      return void undefined
    }

    // check if size (in bytes) exceeds 10 MB
    if (singleImage.size > 10_000_000) {
      pushNewSnackbar('Maksymalny rozmiar to 10 MB.', 'warning')
      return void undefined
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setLoadedImageSrc(event.target?.result as string)
      onLoadAction()
      turnOffAppBusyLoader()
    };

    reader.readAsDataURL(singleImage);

    // reset input to allow uploading same image again
    event.target.value = '';
  }


  useEffect(() => {
    // Revoke the object URL, to allow the garbage collector to destroy the uploaded before file
    return () => {
      if (loadedImageSrc) {
        URL.revokeObjectURL(loadedImageSrc);
      }
    };
  }, [loadedImageSrc]);

  return {loadedImageSrc, loadPhotoActionCallback, onLoadImage, inputRef, clearLoadedImage} as const
}

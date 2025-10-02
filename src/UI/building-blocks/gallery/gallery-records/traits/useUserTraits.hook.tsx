import {useCallback} from 'react';
import {useGetGalleryConfig} from '../../hooks/useGetGalleryConfig.hook';
import {Trait} from '../../../../../READONLY-shared-kernel/domain/gallery/gallery.types';


export const useUserTraits = () => {

  const {galleryConfig, updateGalleryConfig} = useGetGalleryConfig()

  const isTraitExistingInUserCollection = useCallback((value: Trait): boolean => {
    return (galleryConfig?.records_traits ?? []).includes(value)
  }, [galleryConfig?.records_traits])


  const isColorTraitExistingInUserCollection = useCallback((value: Trait): boolean => {
    return (galleryConfig?.records_color_traits ?? []).includes(value)
  }, [galleryConfig?.records_color_traits])

  return {
    galleryConfig,
    updateGalleryConfig,
    isTraitExistingInUserCollection,
    isColorTraitExistingInUserCollection
  } as const
}

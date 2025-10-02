import {useCallback, useEffect, useState} from 'react';
import {GalleryConfig} from '../../../../READONLY-shared-kernel/models/db_models';
import {getGalleryConfig_IO} from '../../../../domain/gallery/galleryIO.possibilities.api';

export const useGetGalleryConfig = () => {

  const [galleryConfig, setGalleryConfig] = useState<GalleryConfig | undefined>(undefined)

  const updateGalleryConfig = useCallback(() => {
    void getGalleryConfig_IO(undefined,
      async (response) => {
        setGalleryConfig(response.data)
      },
      async () => {
      })
  }, [])

  useEffect(() => {
    updateGalleryConfig()
  }, [updateGalleryConfig])

  return {galleryConfig, updateGalleryConfig} as const
}

import {useState} from 'react'
import {GalleryDataContextType} from './galleryData.context';


export const useGalleryDataContext = (): GalleryDataContextType => {

  const [galleryRecords, setGalleryRecords] = useState<GalleryDataContextType['galleryRecords']>([])

  return (
    {
      galleryRecords,
      setGalleryRecords
    })
}

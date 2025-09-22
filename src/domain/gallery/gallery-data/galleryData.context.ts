import {createContext} from 'react';
import {GalleryRecord} from '../../../READONLY-shared-kernel/models/db_models';


export type GalleryDataContextType = {
  galleryRecords: GalleryRecord[] | null
  setGalleryRecords: (data: GalleryRecord[]) => void
}

export const galleryDataContextInitialValue: GalleryDataContextType = {
  galleryRecords: null,
  setGalleryRecords: () => undefined
}

export const GalleryDataContext = createContext<GalleryDataContextType>(galleryDataContextInitialValue)

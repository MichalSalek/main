import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {GallerySliceData, initialGallerySliceData} from './gallery.read'


export const gallerySlice = createSlice({
  name: 'gallerySlice',
  initialState: initialGallerySliceData,
  reducers: {

    STORE_SET_gallery_filtersStrictSwitch: (state, action: PayloadAction<GallerySliceData['filtersStrictSwitch']>) => {
      state.filtersStrictSwitch = action.payload
    },


  }
})

export const {
  STORE_SET_gallery_filtersStrictSwitch,
} = gallerySlice.actions


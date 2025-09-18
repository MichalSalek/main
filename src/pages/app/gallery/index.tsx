import {Stack} from "@mui/material";
import {GalleryFiltersMolecule} from "../../../UI/building-blocks/gallery/filters/GalleryFilters.molecule";
import {GalleryRecordsListMolecule} from "../../../UI/building-blocks/gallery/GalleryRecordsList.molecule";
import {GalleryDataContext} from "../../../domain/gallery/gallery-data/galleryData.context";
import {useGalleryDataContext} from "../../../domain/gallery/gallery-data/galleryDataContext.hook";


export default function Gallery() {

  const GalleryDataContextValue = useGalleryDataContext()

  return <Stack>

    <GalleryDataContext.Provider value={GalleryDataContextValue}>

      <GalleryFiltersMolecule/>

      <GalleryRecordsListMolecule/>

    </GalleryDataContext.Provider>

  </Stack>
}


export async function getStaticProps() {
  return {
    props: {}
  }
}


import {AddNewPhotoOrganism} from '../../../../UI/building-blocks/gallery/gallery-records/add-new/AddNewPhoto.organism';

export default function UploadAsset() {


  return <>

    <AddNewPhotoOrganism/>

  </>
}


export async function getStaticProps() {
  return {
    props: {}
  }
}


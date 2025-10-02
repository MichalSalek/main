import {AddNewPhotoOrganism} from '../../../../UI/building-blocks/gallery/gallery-records/add-new/AddNewPhoto.organism';
import {StaticProps} from '../../../_app';

export default function UploadAsset() {


  return <>

    <AddNewPhotoOrganism/>

  </>
}


export async function getStaticProps(): StaticProps {
  return {
    props: {
      title: ''
    }
  }
}


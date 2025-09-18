import {AdminSimpleBox} from '../UI/building-blocks/admin/AdminSimpleBox.atom'
import {AppConnectionChecker} from '../UI/building-blocks/admin/AppConnectionChecker.molecule'


export default function Index() {

  return (
    <>

      <AdminSimpleBox title={'Check apps connection'}>
        <AppConnectionChecker/>
      </AdminSimpleBox>


    </>)
}


export async function getStaticProps() {
  return {
    props: {}
  }
}

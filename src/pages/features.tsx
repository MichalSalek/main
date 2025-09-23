import {Typography} from '@mui/material'


export default function Index() {

  return (
    <>

      <Typography variant={'h1'}>
        Odkryj możliwości
      </Typography>


    </>)
}


export async function getStaticProps() {
  return {
    props: {}
  }
}

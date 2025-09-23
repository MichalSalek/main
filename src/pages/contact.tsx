import {Typography} from '@mui/material'
import {ContactFormOrganism} from '../UI/building-blocks/contact/ContactForm.organism';

export default function Index() {

  return (
    <>

      <Typography variant={'h1'}>
        Kontakt
      </Typography>

      <ContactFormOrganism />

    </>)
}


export async function getStaticProps() {
  return {
    props: {}
  }
}

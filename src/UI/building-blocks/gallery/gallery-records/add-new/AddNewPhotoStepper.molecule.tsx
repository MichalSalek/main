import 'react-advanced-cropper/dist/style.css'
import {Step, StepContent, StepLabel, Stepper, Typography} from '@mui/material';
import {STYLES_POLICY} from '../../../../styles/styles.policy';

const steps = [
  {
    label: 'Dodawanie zdjęcia',
    description: <span>Wybierz obraz z pamięci swojego urządzenia.</span>,
  },
  {
    label: 'Dostosowanie',
    description: <span>Cropper umożliwi Ci wybranie odpowiedniego rozmiaru. <br/>
    Gdy to zrobisz, przejdź dalej.</span>,
  },
  {
    label: 'Wybór cech',
    description: `W tym kroku wybierz cechy do zdjęcia.
    Dzięki nim będziesz mógł tworzyć kategorie oraz filtrować swoją galerię.`,
  },
  {
    label: 'Zapis zdjęcia do galerii',
    description: 'Gotowe!',
  }
]


type Props = {
  showStepper: boolean
  processStep: number
}

export const AddNewPhotoStepperMolecule = ({showStepper, processStep}: Props) => {

  if (!showStepper) {
    return undefined
  }

  return <Stepper
    activeStep={processStep}
    orientation="vertical" sx={{
    margin: STYLES_POLICY.spacing[4]
  }}>
    {steps.map((step, index) => (
      <Step key={step.label}>
        <StepLabel>
          <Typography variant={'h3'}>{step.label}</Typography>
        </StepLabel>
        <StepContent>
          <Typography variant={'body1'}>{step.description}</Typography>
        </StepContent>

      </Step>
    ))}
  </Stepper>
}

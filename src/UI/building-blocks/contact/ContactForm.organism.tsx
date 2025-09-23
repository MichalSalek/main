import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form';
import {Button, Typography} from '@mui/material';

export const ContactFormOrganism = () => {

  const {register, handleSubmit, watch, formState: {errors}} = useForm();
  const onSubmit: SubmitHandler<FieldValues> = data => console.log(data);

  return <Box
    component={'form'}
    onSubmit={handleSubmit(onSubmit)}
    noValidate
    autoComplete="off"
  >


    <TextField

      label={<Typography variant={'caption'} color={errors.email ? 'error' : undefined}>Email *</Typography>}

      {...register('email', {required: true})}

    />

    <TextField

      label={<Typography variant={'caption'} color={errors.content ? 'error' : undefined}>Treść *</Typography>}

      {...register('content', {required: true})}

    />

    <Button type={'submit'}> Wyślij </Button>

  </Box>


}

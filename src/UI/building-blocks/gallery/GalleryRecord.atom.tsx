import {Box, Button, Card, CardContent, CardMedia, Fab, Paper, Skeleton, Stack, Typography} from '@mui/material';
import {FilterSelectedValuesAtom} from '../admin/user-list/user-list-filters/generics/FilterSelectedValues.atom';
import {GalleryRecord} from '../../../READONLY-shared-kernel/models/db_models';
import {STYLES_POLICY} from '../../styles/styles.policy';
import {IMAGE_ASPECT_RATIO} from '../../../domain/gallery/gallery-records.config';
import {getAppIcon} from '../../../domain/app-icons/adapters/MuiIcons.adapter';
import {isNotDefined} from '@msalek/utils';


export type GalleryRecordActions = {
  loadPhotoActionCallback?: () => void
  cropActionCallback?: () => void
  editTraitsCallback?: () => void
}

const ImageAtom = (
  {asset_url, cropActionCallback, loadPhotoActionCallback}: {
    asset_url?: GalleryRecord['asset_url']
  } & GalleryRecordActions) => {

  return <Box sx={{
    position: 'relative',

  }}>

    {asset_url ?

      <>

        <img
          src={asset_url}
          width={'100%'}
          height={'auto'}
          alt=''
          fetchPriority={'high'}
          decoding={'async'}
          loading={'lazy'}
          style={{
            aspectRatio: IMAGE_ASPECT_RATIO
          }}
        />

        {isNotDefined(cropActionCallback) ? undefined :
          <Stack
            sx={{
              position: 'absolute',
              bottom: STYLES_POLICY.spacing[2],
              right: STYLES_POLICY.spacing[2],
              gap: STYLES_POLICY.spacing[1]
            }}>

            <Fab
              size={'small'}
              color={'info'}
              onClick={loadPhotoActionCallback}>
              {getAppIcon.AddPhoto({
                color: 'inherit',
                fontSize: 'medium'
              })}
            </Fab>

            <Fab
              size={'small'}
              color={'info'}
              onClick={cropActionCallback}>
              {getAppIcon.Crop({
                color: 'inherit',
                fontSize: 'medium'
              })}
            </Fab>

          </Stack>
        }

      </> :

      <Paper variant={'elevation'}>
        <Skeleton
          animation={'pulse'}
          height={'50dvh'}
          variant={'rectangular'}
          onClick={loadPhotoActionCallback}
        />

        {getAppIcon.AddPhoto({
          color: 'info',
          sx: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }
        })}
      </Paper>

    }

  </Box>
}


export const GalleryRecordAtom = (
  {el, shouldShowCardContent = true, ...props}: {
    el: Partial<GalleryRecord>,
    shouldShowCardContent?: boolean
  } & GalleryRecordActions) => {
  return <Box>
    <Card sx={{minWidth: '100%'}} variant={'outlined'}>

      <CardMedia>

        <ImageAtom asset_url={el.asset_url} {...props} />

      </CardMedia>
      <CardContent
        onClick={props.editTraitsCallback}
        sx={{
          position: 'relative',
          display: shouldShowCardContent ? undefined : 'none'
        }}>

        <Typography variant="body1" sx={{color: 'text.secondary'}}>
          Cechy
        </Typography>
        <Box>
          <FilterSelectedValuesAtom values={el.asset_traits}/>
        </Box>

        <Typography variant="body1" sx={{color: 'text.secondary'}}>
          Kolorystyka
        </Typography>
        <Box>
          <FilterSelectedValuesAtom values={el.asset_color_traits}/>
        </Box>


        {props.editTraitsCallback && <Button
            size={'small'}
            variant={'text'}
            sx={
              {
                pointerEvents: 'none',
                padding: 0,
                position: 'absolute',
                top: STYLES_POLICY.spacing[2],
                right: STYLES_POLICY.spacing[2],
              }
            }
        >
          {getAppIcon.Edit({})}
        </Button>}


      </CardContent>
      {/*<CardActions>*/} {/* @TODO RACZEJ DO POZBYCIA SIĘ */}
      {/*  <Button size="small" variant={'outlined'}>Zapisz</Button>*/}
      {/*</CardActions>*/}

    </Card>
  </Box>
}

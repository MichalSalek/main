import {Box, Card, CardActions, CardContent, CardMedia, Fab, Stack, Typography, Zoom} from '@mui/material';
import {FilterSelectedValuesAtom} from '../admin/user-list/user-list-filters/generics/FilterSelectedValues.atom';
import {GalleryRecord} from '../../../READONLY-shared-kernel/models/db_models';
import {STYLES_POLICY} from '../../../READONLY-shared-kernel/policies/styles.policy';
import CircularProgress from '@mui/material/CircularProgress';
import {useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {GalleryDataContext} from '../../../domain/gallery/gallery-data/galleryData.context';
import {useAppSelector} from '../../../application/store/store';
import {STORE_SEL_scrollPosition_position} from '../../../application/scroll-position/scrollPosition.read';
import {getAppIcon} from '../../../domain/app-icons/adapters/MuiIcons.adapter';


const RECORDS_NUMBER_PER_PAGE = 4
const NEXT_PAGE_TRIGGER_OFFSET_IN_PX = 1500

const RowAtom = ({el, index}: { el: GalleryRecord, index: number }) => {
  return <Box paddingBottom={STYLES_POLICY.spacing[5]}>
    <Card key={el.gallery_record_id} sx={{minWidth: '100%'}} variant={'elevation'}>

      <CardMedia>
        <img
          src={el.asset_url}
          width={'100%'}
          height={'auto'}
          alt=''
          fetchPriority={'high'}
          decoding={'async'}
          loading={'lazy'}
        />

      </CardMedia>
      <CardContent>
        <Typography variant="body1" sx={{color: 'text.secondary'}}>
          Cechy
        </Typography>
        <Typography gutterBottom variant="caption" component="div">
          <FilterSelectedValuesAtom values={el.asset_traits}/>
        </Typography>

        <Typography variant="body1" sx={{color: 'text.secondary'}}>
          Kolorystyka
        </Typography>
        <Typography gutterBottom variant="caption" component="div">
          <FilterSelectedValuesAtom values={el.asset_color_traits}/>
        </Typography>
      </CardContent>
      <CardActions>
        {/*<Button size="small" variant={'outlined'}>Zapisz</Button>*/}
      </CardActions>

    </Card>
  </Box>
}


export const GalleryRecordsListMolecule = () => {
  const {galleryRecords} = useContext(GalleryDataContext)
  const scrollPosition = useAppSelector(STORE_SEL_scrollPosition_position)

  const [UIVisibleRecords, setUIVisibleRecords] = useState<GalleryRecord[]>([])

  const [hasMore, setHasMore] = useState<boolean>(true)


  useEffect(() => { // On new Gallery Records load.
    if (!galleryRecords) {
      return void undefined
    }
    setUIVisibleRecords(galleryRecords.slice(0, RECORDS_NUMBER_PER_PAGE))
    setHasMore(true)
  }, [galleryRecords])


  const loadMoreAction = useCallback(() => {
    if (!hasMore || !galleryRecords) {
      return void undefined
    }
    const newRecords = galleryRecords.slice(UIVisibleRecords.length, RECORDS_NUMBER_PER_PAGE + UIVisibleRecords.length)
    if (newRecords.length === 0) {
      return void undefined
    }
    setUIVisibleRecords((prev) => prev.concat(newRecords))

  }, [galleryRecords, hasMore, UIVisibleRecords.length])


  const entireDocumentHeight = document.documentElement.scrollHeight
  const bottomEdgeOfScrollPosition = useMemo(() => (scrollPosition ?? 0) + document.documentElement.clientHeight, [scrollPosition])


  // Set flag when user see the last record.
  //
  useEffect(() => {
    if (UIVisibleRecords.length === galleryRecords?.length) {
      setHasMore(false)
    }
  }, [galleryRecords?.length, UIVisibleRecords.length])


  useEffect(() => {
    if (!scrollPosition) {
      return void undefined
    }
    const isBreakpointReached = entireDocumentHeight - NEXT_PAGE_TRIGGER_OFFSET_IN_PX < bottomEdgeOfScrollPosition
    if (isBreakpointReached) {
      loadMoreAction()
    }
  }, [bottomEdgeOfScrollPosition, entireDocumentHeight, loadMoreAction, scrollPosition])


  return <Stack>


    {galleryRecords === null ? <CircularProgress/> : undefined}

    {UIVisibleRecords?.map((el, index) => <RowAtom el={el} index={index} key={index}/>)}


    <Zoom
      in={!!scrollPosition && entireDocumentHeight - NEXT_PAGE_TRIGGER_OFFSET_IN_PX < (scrollPosition ?? 0)}
      style={{
        position: 'sticky',
        left: '100%',
        bottom: '100px'
      }}
    >
      <Fab color="primary" aria-label="Go to top" onClick={() => scrollTo(0, 0)}>
        {getAppIcon.Up({color: 'inherit'})}
      </Fab>
    </Zoom>


  </Stack>

}

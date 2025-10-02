import {Container, Fab, Stack, Zoom} from '@mui/material';
import {GalleryRecord} from '../../../READONLY-shared-kernel/models/db_models';
import {STYLES_POLICY} from '../../styles/styles.policy';
import CircularProgress from '@mui/material/CircularProgress';
import {useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {GalleryDataContext} from '../../../domain/gallery/gallery-data/galleryData.context';
import {useAppSelector} from '../../../application/store/store';
import {STORE_SEL_scrollPosition_position} from '../../../application/scroll-position/scrollPosition.read';
import {getAppIcon} from '../../../domain/app-icons/adapters/MuiIcons.adapter';
import {GalleryRecordAtom} from './GalleryRecord.atom';


const RECORDS_NUMBER_PER_PAGE = 4
const NEXT_PAGE_TRIGGER_OFFSET_IN_PX = 1500


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


  return <Stack
    gap={STYLES_POLICY.spacing[4]}
  >


    {galleryRecords === null ? <CircularProgress/> : undefined}

    {UIVisibleRecords?.map((el, index) =>
      <GalleryRecordAtom el={el} key={index}/>)}


    <Zoom
      in={!!scrollPosition && entireDocumentHeight - NEXT_PAGE_TRIGGER_OFFSET_IN_PX < (scrollPosition ?? 0)}
      style={{
        position: 'sticky',
        bottom: `calc(${STYLES_POLICY.appBarDimension} + ${STYLES_POLICY.spacing[1]})`,
      }}
    >
      <Container
        disableGutters={true}
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: STYLES_POLICY.spacing[3]
        }}>
        <Fab color={'info'} aria-label="Scroll to top" onClick={() => scrollTo(0, 0)}>
          {getAppIcon.Up({color: 'inherit'})}
        </Fab>
      </Container>
    </Zoom>


  </Stack>

}

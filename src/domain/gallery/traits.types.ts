import {GalleryRecord} from '../../READONLY-shared-kernel/models/db_models';

export type TraitsPartial = Pick<GalleryRecord, 'asset_traits' | 'asset_color_traits'>

export type TraitsCollectionsNames = 'asset_traits' | 'asset_color_traits' // @TODO obsłużyć TS - wyciągnać klucze z GalleryRecord

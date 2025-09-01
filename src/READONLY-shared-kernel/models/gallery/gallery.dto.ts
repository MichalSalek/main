import {IOClientFunctionReqResErr} from '../../application/http/http.client.types'
import {DetailedErrorPayload} from '../../application/http/http.types'
import {Trait} from "../../domain/gallery/gallery.types";
import {GalleryConfig, GalleryRecord} from "../db_models";


export type GALLERY_DTO_API_V1 = {

  CREATE_GALLERY_RECORD: {
    REQUEST: {
      asset_url: string
      traits: Trait[]
      color_traits: Trait[]
    }
    RESPONSE: undefined
    RESPONSE_ERROR: DetailedErrorPayload<GALLERY_DTO_API_V1['CREATE_GALLERY_RECORD']['REQUEST']>
    IO_CLIENT_FUNCTION: IOClientFunctionReqResErr<GALLERY_DTO_API_V1['CREATE_GALLERY_RECORD']['REQUEST'], GALLERY_DTO_API_V1['CREATE_GALLERY_RECORD']['RESPONSE'], GALLERY_DTO_API_V1['CREATE_GALLERY_RECORD']['RESPONSE_ERROR']>
  },

  GET_GALLERY_RECORDS: {
    REQUEST: {
      gallery_record_id?: GalleryRecord['gallery_record_id'] | undefined
      asset_traits: Trait[]
      asset_color_traits: Trait[]
      apply_strict_filter: boolean
    }
    RESPONSE: GalleryRecord[]
    RESPONSE_ERROR: DetailedErrorPayload<GALLERY_DTO_API_V1['GET_GALLERY_RECORDS']['REQUEST']>
    IO_CLIENT_FUNCTION: IOClientFunctionReqResErr<GALLERY_DTO_API_V1['GET_GALLERY_RECORDS']['REQUEST'], GALLERY_DTO_API_V1['GET_GALLERY_RECORDS']['RESPONSE'], GALLERY_DTO_API_V1['GET_GALLERY_RECORDS']['RESPONSE_ERROR']>
  },

  GET_GALLERY_CONFIG: {
    REQUEST: undefined
    RESPONSE: GalleryConfig
    RESPONSE_ERROR: DetailedErrorPayload<GALLERY_DTO_API_V1['GET_GALLERY_CONFIG']['REQUEST']>
    IO_CLIENT_FUNCTION: IOClientFunctionReqResErr<GALLERY_DTO_API_V1['GET_GALLERY_CONFIG']['REQUEST'], GALLERY_DTO_API_V1['GET_GALLERY_CONFIG']['RESPONSE'], GALLERY_DTO_API_V1['GET_GALLERY_CONFIG']['RESPONSE_ERROR']>
  },

  CREATE_TRAIT: {
    REQUEST: {
      trait: Trait
      color_trait: Trait
    }
    RESPONSE: undefined
    RESPONSE_ERROR: DetailedErrorPayload<GALLERY_DTO_API_V1['CREATE_TRAIT']['REQUEST']>
    IO_CLIENT_FUNCTION: IOClientFunctionReqResErr<GALLERY_DTO_API_V1['CREATE_TRAIT']['REQUEST'], GALLERY_DTO_API_V1['CREATE_TRAIT']['RESPONSE'], GALLERY_DTO_API_V1['CREATE_TRAIT']['RESPONSE_ERROR']>
  },

  DELETE_ASSET_FROM_VENDOR: {
    REQUEST: {
      asset_id: string // string not IDType, because is external service.
    }
    RESPONSE: undefined
    RESPONSE_ERROR: DetailedErrorPayload<GALLERY_DTO_API_V1['DELETE_ASSET_FROM_VENDOR']['REQUEST']>
    IO_CLIENT_FUNCTION: IOClientFunctionReqResErr<GALLERY_DTO_API_V1['DELETE_ASSET_FROM_VENDOR']['REQUEST'], GALLERY_DTO_API_V1['DELETE_ASSET_FROM_VENDOR']['RESPONSE'], GALLERY_DTO_API_V1['DELETE_ASSET_FROM_VENDOR']['RESPONSE_ERROR']>
  }
}

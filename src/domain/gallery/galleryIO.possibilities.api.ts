import {callHTTPEndpoint} from '../../application/http-layer/http.operations.api'
import {ENDPOINTS} from '../../READONLY-shared-kernel/domain/http/http.endpoints'
import {GALLERY_DTO_API_V1} from '../../READONLY-shared-kernel/models/gallery/gallery.dto';
import {httpHandlerAction} from '../../application/http-layer/axios-adapter/axios.adapter';
import {reportIssue} from '../../application/error-debugger/errorHandler.possibilities.api';
import {CloudinaryType} from './cloudinary-adapter/cloudinary.types';
import {CLOUDINARY_UPLOAD_URL} from '../../READONLY-shared-kernel/domain/adapters/cloudinary/cloudinary.config';
import {ENV_VARS} from '../../application/environment/environment.config';


export const getGalleryConfig_IO: GALLERY_DTO_API_V1['GET_GALLERY_CONFIG']['IO_CLIENT_FUNCTION'] = async (
  _,
  successCallback,
  errorCallback) => {
  await callHTTPEndpoint<GALLERY_DTO_API_V1['GET_GALLERY_CONFIG']['RESPONSE'], GALLERY_DTO_API_V1['GET_GALLERY_CONFIG']['RESPONSE_ERROR']>({
    config: {
      url: ENDPOINTS.GET_GALLERY_CONFIG,
      mode: 'get'
    },
    successCallback: async (response) => {
      await successCallback(response)
    },
    errorCallback: async (error) => {
      await errorCallback(error)
    }
  })
}


export const createTrait_IO: GALLERY_DTO_API_V1['CREATE_TRAIT']['IO_CLIENT_FUNCTION'] = async (
  req,
  successCallback,
  errorCallback) => {
  await callHTTPEndpoint<GALLERY_DTO_API_V1['CREATE_TRAIT']['RESPONSE'], GALLERY_DTO_API_V1['CREATE_TRAIT']['RESPONSE_ERROR']>({
    config: {
      url: ENDPOINTS.GALLERY_CREATE_TRAIT,
      mode: 'post',
      payload: req
    },
    successCallback: async (response) => {
      await successCallback(response)
    },
    errorCallback: async (error) => {
      await errorCallback(error)
    }
  })
}


export const uploadPhotoAsset_IO = async (
  req: FormData,
  successCallback: (response: CloudinaryType) => void,
  errorCallback: (error: unknown) => void) => {
  try {
    await httpHandlerAction<CloudinaryType, unknown>({
      url: CLOUDINARY_UPLOAD_URL(ENV_VARS.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME),
      mode: 'post',
      payload: req,
      fireOnSuccess: async (response) => {
        successCallback(response.data)
      },
      fireOnCatch: async (error) => {
        reportIssue('uploadPhotoAsset_IO error', error)
        errorCallback(error)
      }
    })
  } catch (e) {
    reportIssue('uploadPhotoAsset_IO', e)
  }
}


export const createGalleryRecord_IO: GALLERY_DTO_API_V1['CREATE_GALLERY_RECORD']['IO_CLIENT_FUNCTION'] = async (
  req,
  successCallback,
  errorCallback) => {
  await callHTTPEndpoint<GALLERY_DTO_API_V1['CREATE_GALLERY_RECORD']['RESPONSE'], GALLERY_DTO_API_V1['CREATE_GALLERY_RECORD']['RESPONSE_ERROR']>({
    config: {
      url: ENDPOINTS.CREATE_GALLERY_RECORD,
      mode: 'post',
      payload: req
    },
    successCallback: async (response) => {
      await successCallback(response)
    },
    errorCallback: async (error) => {
      await errorCallback(error)
    }
  })
}


export const getGalleryRecords_IO: GALLERY_DTO_API_V1['GET_GALLERY_RECORDS']['IO_CLIENT_FUNCTION'] = async (
  req,
  successCallback,
  errorCallback) => {
  await callHTTPEndpoint<GALLERY_DTO_API_V1['GET_GALLERY_RECORDS']['RESPONSE'], GALLERY_DTO_API_V1['GET_GALLERY_RECORDS']['RESPONSE_ERROR']>({
    config: {
      url: ENDPOINTS.GET_GALLERY_RECORDS,
      mode: 'post',
      payload: req
    },
    successCallback: async (response) => {
      await successCallback(response)
    },
    errorCallback: async (error) => {
      await errorCallback(error)
    }
  })
}


export const deleteAssetFromVendor_IO: GALLERY_DTO_API_V1['DELETE_ASSET_FROM_VENDOR']['IO_CLIENT_FUNCTION'] = async (
  req,
  successCallback,
  errorCallback) => {
  await callHTTPEndpoint<GALLERY_DTO_API_V1['DELETE_ASSET_FROM_VENDOR']['RESPONSE'], GALLERY_DTO_API_V1['DELETE_ASSET_FROM_VENDOR']['RESPONSE_ERROR']>({
    config: {
      url: ENDPOINTS.DELETE_ASSET_FROM_VENDOR,
      mode: 'post',
      payload: req
    },
    successCallback: async (response) => {
      await successCallback(response)
    },
    errorCallback: async (error) => {
      await errorCallback(error)
    }
  })
}


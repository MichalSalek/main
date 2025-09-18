// Create a Cloudinary instance and set your cloud name.
import {Cloudinary} from "@cloudinary/url-gen"
import {ENV_VARS} from "../../../application/environment/environment.config";


export const cloudinary = new Cloudinary({
  cloud: {
    cloudName: ENV_VARS.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  }
})

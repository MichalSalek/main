// Create a Cloudinary instance and set your cloud name.
import {Cloudinary} from "@cloudinary/url-gen"
import {cloudName} from "../../../READONLY-shared-kernel/domain/adapters/cloudinary/cloudinary.config";

export const cloudinary = new Cloudinary({
  cloud: {
    cloudName
  }
})

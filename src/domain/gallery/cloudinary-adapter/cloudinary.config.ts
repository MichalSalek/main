import { getEnvironmentMode } from "../../../application/environment/environment.utils.api";
import {getIDMark} from "../../../READONLY-shared-kernel/domain/gallery/gallery.utils";
import {IDType} from "../../../READONLY-shared-kernel/application/application.types";

export const CLOUDINARY_ASSET_FOLDER = (id: IDType) =>
  getEnvironmentMode() + '_' + getIDMark(id)

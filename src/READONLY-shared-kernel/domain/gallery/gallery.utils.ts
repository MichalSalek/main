import {IDType} from "../../application/application.types";

export const getIDMark = (id: IDType): string => `__id__${id}`

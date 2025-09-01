// To use ENV VARS - use getter from utils, not a RAW one.
// Here is config only:
//
export const RAW_ENV_VARS_NOT_USE = {
  WEB_1_EXTERNAL_PORT: process.env.NEXT_PUBLIC_PORT_WEB_1!,
  WEB_2_EXTERNAL_PORT: process.env.NEXT_PUBLIC_PORT_WEB_2!,
  WEB_1_INTERNAL_NAME: process.env.NEXT_PUBLIC_WEB_1_INTERNAL!,
  WEB_2_INTERNAL_NAME: process.env.NEXT_PUBLIC_WEB_2_INTERNAL!,
  HTTP_PROTOCOL: process.env.NEXT_PUBLIC_HTTP_PROTOCOL!,
  HTTP_WEB1_APP_HOST: process.env.NEXT_PUBLIC_HTTP_WEB1_APP_HOST!
} as const



export const YesOrNoFilterValue = Object.freeze({
  YES: 'YES',
  NO: 'NO'
} as const)
export type YesOrNoFilter = keyof typeof YesOrNoFilterValue

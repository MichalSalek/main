import { CSSProperties } from 'react'
import { STYLES_POLICY } from '../../../../../READONLY-shared-kernel/policies/styles.policy'

export const clickableElementCss: CSSProperties = {
  width: '100%',
  color: 'inherit'
}

export const setPaddingCss: CSSProperties = {
  paddingTop: STYLES_POLICY.spacing[2],
  paddingRight: STYLES_POLICY.spacing[1],
  paddingBottom: STYLES_POLICY.spacing[2],
  paddingLeft: STYLES_POLICY.spacing[1],
}

export const menuIconFontSize = 'medium'

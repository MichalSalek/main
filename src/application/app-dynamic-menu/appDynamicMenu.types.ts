import {JSX} from 'react';
import {SvgIconOwnProps} from '@mui/material';

export type AppDynamicMenuButton = {
  title: string
  action: () => void
  icon: (props?: SvgIconOwnProps) => JSX.Element
}

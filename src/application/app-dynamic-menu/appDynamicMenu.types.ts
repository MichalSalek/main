import {ReactNode} from "react";

export type AppDynamicMenuButton = {
  title: string
  action: () => void
  icon: ReactNode
}

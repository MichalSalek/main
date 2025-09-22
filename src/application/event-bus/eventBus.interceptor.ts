import {EVENT_INFO_TYPE} from '../../READONLY-shared-kernel/domain/commands-and-queries/cqrs.types';
import {pushNewSnackbar} from '../app-snackbar/appSnackbar.possibilities.api';
import {
  criticalRedirectionsDependingOnEventLogsStreamInterceptor
} from '../../domain/redirections-and-routing/criticalRedirectionsDependingOnEventLogsStream.interceptor';
import {SnackbarWrapper} from '../app-snackbar/appSnackbar.types';
import {
  criticalStateChangesDependingOnEventLogsStream
} from '../../domain/app-state-of-store/criticalStateChangesDependingOnEventLogsStream.interceptor';


export type EventBusSideEffectInterceptor = {
  payload?: Record<string, unknown>
  event: EVENT_INFO_TYPE
}

export const eventBusSideEffectInterceptor = async (
  {
    event,
    payload = {}
  }: EventBusSideEffectInterceptor): Promise<void> => {

  if (!event) {
    return void undefined
  }

  //
  // SNACKBARS
  //
  pushNewSnackbar(
    event,
    (payload['snackbarColor'] as SnackbarWrapper['color']) ?? undefined)


  //
  // APPLICATION STATE
  //
  await criticalStateChangesDependingOnEventLogsStream(event)

  //
  // REDIRECTIONS ON EVENTS
  //
  criticalRedirectionsDependingOnEventLogsStreamInterceptor(event)

}

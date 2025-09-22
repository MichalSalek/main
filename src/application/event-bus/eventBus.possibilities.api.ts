import {EventBusSideEffectInterceptor, eventBusSideEffectInterceptor} from './eventBus.interceptor';

export const pushEventToBus = async (props: EventBusSideEffectInterceptor): Promise<void> => {

  await eventBusSideEffectInterceptor(props)

}

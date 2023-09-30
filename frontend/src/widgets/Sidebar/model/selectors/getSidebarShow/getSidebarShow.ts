import { StateSchema } from 'app/providers/StoreProvider';

export const getSidebarShow = (state: StateSchema) => state.sidebar?.sidebarShow;

import { StateSchema } from 'app/providers/StoreProvider';

export const getSidebarUnfoldable = (state: StateSchema) => state.sidebar?.sidebarUnfoldable;

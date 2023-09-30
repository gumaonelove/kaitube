import { StateSchema } from 'app/providers/StoreProvider';

export const getVideoDescriptionData = (state: StateSchema) => state.video.data;

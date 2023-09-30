import { StateSchema } from 'app/providers/StoreProvider';

export const getVideoDescriptionError = (state: StateSchema) => state.video.error;

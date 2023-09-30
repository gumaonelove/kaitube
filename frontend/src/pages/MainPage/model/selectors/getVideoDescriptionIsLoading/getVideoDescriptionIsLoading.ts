import { StateSchema } from 'app/providers/StoreProvider';

export const getVideoDescriptionIsLoading = (state: StateSchema) => state.video.isLoading;

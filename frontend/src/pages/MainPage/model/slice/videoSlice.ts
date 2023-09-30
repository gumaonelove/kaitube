import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VideoResponse, VideoSchema } from 'pages/MainPage';
import { fetchVideoDescription } from '../services/fetchVideoDescription/fetchVideoDescription';

const initialState: VideoSchema = {
    data: undefined,
    isLoading: false,
    error: undefined,
};

const videoSlice = createSlice({
    name: 'video',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchVideoDescription.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchVideoDescription.fulfilled, (state, action: PayloadAction<VideoResponse>) => {
                state.data = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchVideoDescription.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: videoActions } = videoSlice;
export const { reducer: videoReducer } = videoSlice;

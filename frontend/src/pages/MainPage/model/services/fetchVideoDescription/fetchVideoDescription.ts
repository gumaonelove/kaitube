import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { VideoResponse, VideoSendData } from 'pages/MainPage';

export const fetchVideoDescription = createAsyncThunk<VideoResponse, VideoSendData, ThunkConfig<string>>(
    'video/fetchVideoDescription',
    async (dataToSend, thunkAPI) => {
        const {
            rejectWithValue, extra,
        } = thunkAPI;

        const data = new FormData();

        data.append('video', dataToSend.video);
        data.append('transcription', dataToSend.transcription);

        try {
            const response = await extra.api.post<VideoResponse>('/listening/', data);

            return response.data;
        } catch (err: any) {
            return rejectWithValue('ERROR');
        }
    },
);

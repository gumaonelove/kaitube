export interface VideoResponse {
    video: string;
    transcription: string;
    video_message: string;
    transcription_message: string;
    description: string;
    url: string;
}

export interface VideoSendData {
    video: File;
    transcription: File;
}

export interface VideoSchema {
    data?: VideoResponse;
    isLoading: boolean;
    error?: string;
}

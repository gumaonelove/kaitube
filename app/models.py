from pydantic import BaseModel


class Answer(BaseModel):
    '''wav'''
    video: str
    transcription: str
    video_message: str
    transcription_message: str
    description: str
    url: str
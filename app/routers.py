from fastapi import APIRouter, File, UploadFile
from models import Answer
from utils import get_file, get_transcription
from stt_summarization import Summarizer


router = APIRouter()
stt_summarizer = Summarizer(
    model_path="/home/asr/projects/kaitube/models/IlyaGusev-mbart_ru_sum_gazeta-finetune-1024-gas-video/checkpoint-110/",
    model_max_length=2048
)


@router.post('/listening/', response_model=Answer)
async def listening(video: UploadFile = File(...), transcription: UploadFile = File(...)) -> dict:
    '''Аудирование - изучение татарских слов'''

    video_message = get_file(video)
    assert video_message == 'success', 'Не удалось сохранить файл с видео'
    transcription_message = get_file(transcription)
    assert transcription_message == 'success', 'Не удалось сохранить файл с транскрипцией'

    transcription_text = get_transcription(transcription.filename)
    summarization_transcription = stt_summarizer.predict(transcription_text)

    return {
        'video': video.filename,
        'transcription': transcription.filename,
        "video_message": video_message,
        'transcription_message': transcription_message,
        'description': summarization_transcription,
        'url': "Тут будет ссылка на файл"
    }

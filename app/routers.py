from fastapi import APIRouter, File, UploadFile
from models import Answer
router = APIRouter()

def get_file(file) -> dict:
    try:
        contents = file.file.read()
        with open(file.filename, 'wb') as f:
            f.write(contents)
    except Exception:
        return {"message": "There was an error uploading the video"}
    finally:
        file.file.close()

    return {'message': 'success'}


@router.post('/listening/', response_model=Answer)
async def listening(video: UploadFile = File(...), transcription: UploadFile = File(...)) -> dict:
    '''Аудирование - изучение татарских слов'''

    video_message = get_file(video)
    transcription_message = get_file(transcription)

    return {
        'video': video.filename,
        'transcription': transcription.filename,
        "video_message": video_message,
        'transcription_message': transcription_message,
        'description': 'Тут будет описание для видео',
        'url': "Тут будет ссылка на файл"
    }

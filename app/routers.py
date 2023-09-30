from fastapi import APIRouter, File, UploadFile
from .models import Answer
router = APIRouter()

@router.post('/listening/', response_model=Answer)
async def listening(file: UploadFile = File(...)) -> dict:
    '''Аудирование - изучение татарских слов'''
    try:
        contents = file.file.read()
        with open(file.filename, 'wb') as f:
            f.write(contents)
    except Exception:
        return {"message": "There was an error uploading the file"}
    finally:
        file.file.close()

    return {
        'file': file.filename,
        "message": "There was an error uploading the file",
        'description': 'Тут будет описание для видео',
        'url': "Тут будет ссылка на файл"
    }

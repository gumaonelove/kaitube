import re
import requests

def get_file(file) -> str:
    try:
        contents = file.file.read()
        with open('app/files/' + file.filename, 'wb') as f:
            f.write(contents)
    except Exception:
        print('ERROR', Exception)
        return "There was an error uploading the video"
    finally:
        file.file.close()

    return 'success'


def get_transcription(file_name: str) -> str:
    reg = re.compile('[^а-яА-Я ]')
    try:
        with open(file_name, 'r') as f:
            text = f.read()
            text = reg.sub('', text)
        return text
    except Exception:
        print('ERROR', Exception)
        return "Не удалось открыть файл"


def get_bert_extractive_summarizer(text: str) -> str:
    url = "http://localhost:8080/summarize_by_ratio?ratio=0.1"
    headers = {"Content-type": "text/plain"}
    response = requests.post(url, headers=headers, data=text.encode())

    return response.json()

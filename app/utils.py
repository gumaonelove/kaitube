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
    try:
        with open(file_name, 'r') as f:
            text = f.read()
        return text
    except Exception:
        print('ERROR', Exception)
        return "Не удалось открыть файл"
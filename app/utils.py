def get_file(file) -> str:
    try:
        contents = file.file.read()
        with open('app/files/' + file.filename, 'wb') as f:
            f.write(contents)
    except Exception:
        return "There was an error uploading the video"
    finally:
        file.file.close()

    return 'success'
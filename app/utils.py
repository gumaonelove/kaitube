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
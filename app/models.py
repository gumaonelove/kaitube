from pydantic import BaseModel


class Answer(BaseModel):
    '''wav'''
    file: str
    message: str
    description: str
    url: str
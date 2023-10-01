import re
from transformers import pipeline


class Summarizer:
    '''Суммаризатор'''

    def __init__(self, model_path: str, model_max_length: int):
        self.summarizer = pipeline(
            "summarization",
            model=model_path,
            device=0
        )
        self.model_max_length = model_max_length

    def predict(self, text: str) -> str:
        text = self.summarizer(text[:self.model_max_length])[0]['summary_text']
        return text
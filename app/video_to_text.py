from transformers import FSMTForConditionalGeneration, FSMTTokenizer, AutoImageProcessor, AutoTokenizer, VisionEncoderDecoderModel
import av
import numpy as np


class VideoEncode:
    device = "cuda:1"

    #translation
    mname = "facebook/wmt19-en-ru"
    tr_tokenizer = FSMTTokenizer.from_pretrained(mname)
    translate = FSMTForConditionalGeneration.from_pretrained(mname).to(device)

    # load pretrained processor, tokenizer, and model for video processing
    image_processor = AutoImageProcessor.from_pretrained("MCG-NJU/videomae-base")
    tokenizer = AutoTokenizer.from_pretrained("gpt2")
    model = VisionEncoderDecoderModel.from_pretrained("Neleac/timesformer-gpt2-video-captioning").to(device)


    def predict(self, video_path: str) -> str:

        try:
            container = av.open(video_path)
        except:
            return ''

        # extract evenly spaced frames from video
        captions = []
        total_len = container.streams.video[0].frames
        clip_len = self.model.config.encoder.num_frames
        for i in range((total_len // 30) // clip_len):
            # print(i)
            fp = i * 30 * 8
            sp = fp + 240
            indices = set(np.linspace(fp, sp, num=clip_len, endpoint=False).astype(np.int64))
            # print(indices)
            frames = []
            container.seek(0)
            for k, frame in enumerate(container.decode(video=0)):
                if k in indices:
                    frames.append(frame.to_ndarray(format="rgb24"))
                    # generate caption
            gen_kwargs = {
                "min_length": 20,
                "max_length": 32,
                "num_beams": 8, }
            pixel_values = self.image_processor(frames, return_tensors="pt").pixel_values.to(self.device)
            tokens = self.model.generate(pixel_values, **gen_kwargs)
            caption = self.tokenizer.batch_decode(tokens, skip_special_tokens=True)[0]
            captions.append(caption)

        video_inf = ' '.join(captions)

        # translation
        input = video_inf
        input_ids = self.tr_tokenizer.encode(input, return_tensors="pt").to(self.device)
        outputs = self.translate.generate(input_ids)
        decoded = self.tr_tokenizer.decode(outputs[0], skip_special_tokens=True)

        return decoded
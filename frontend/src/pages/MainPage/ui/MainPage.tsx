import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { CButton, CToaster } from '@coreui/react';
import {
    ChangeEvent, ReactElement, useCallback, useRef, useState,
} from 'react';
import { Toast } from 'shared/ui/Toast/Toast';
import {
    Text, TextSize, TextTheme, TextWeight,
} from 'shared/ui/Text/Text';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { Loader } from 'shared/ui/Loader/Loader';
import { fetchVideoDescription } from '../model/services/fetchVideoDescription/fetchVideoDescription';
import cls from './MainPage.module.scss';
import {
    getVideoDescriptionIsLoading,
} from '../model/selectors/getVideoDescriptionIsLoading/getVideoDescriptionIsLoading';
import { getVideoDescriptionError } from '../model/selectors/getVideoDescriptionError/getVideoDescriptionError';
import { getVideoDescriptionData } from '../model/selectors/getVideoDescriptionData/getVideoDescriptionData';

const MainPage = () => {
    const [toast, addToast] = useState<ReactElement>();
    const toaster = useRef<HTMLDivElement | null>(null);
    const [videoSrc, seVideoSrc] = useState('');
    const [videoFile, setVideoFile] = useState<File>();
    const [textFile, setTextFile] = useState<File>();
    const dispatch = useAppDispatch();
    const videoDescriptionIsLoading = useSelector(getVideoDescriptionIsLoading);
    const videoDescriptionError = useSelector(getVideoDescriptionError);
    const videoDescriptionData = useSelector(getVideoDescriptionData);

    const handleVideoFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files![0].name.split('.')[1] !== 'mp4' && e.target.files![0].type !== 'video/mp4') {
            addToast(Toast.error('Разрешены файлы, имеющие только расширение .mp4'));
        } else if (e.target.files) {
            setVideoFile(e.target.files[0]);
            seVideoSrc(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleTextFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files![0].name.split('.')[1] !== 'txt' && e.target.files![0].type !== 'text/plain') {
            addToast(Toast.error('Разрешены файлы, имеющие только расширение .txt'));
        } else if (e.target.files) {
            setTextFile(e.target.files[0]);
        }
    };

    const getVideoDescriptionHandler = useCallback(() => {
        dispatch(fetchVideoDescription({
            video: videoFile!,
            transcription: textFile!,
        }));
    }, [dispatch, textFile, videoFile]);

    let videoContent;

    if (videoDescriptionIsLoading) {
        videoContent = (
            <div className={cls.loadingBlock}>
                <Loader />
                <Text
                    className={cls.loadingTitle}
                    size={TextSize.XL}
                    weight={TextWeight.BOLD}
                >
                    Получаем описание к видео, пожалуйста, подождите
                </Text>
            </div>
        );
    } else if (videoDescriptionError) {
        videoContent = (
            <Text
                theme={TextTheme.ERROR}
                size={TextSize.L}
                weight={TextWeight.SEMIBOLD}
            >
                Произошла ошибка при попытке получить описание к видео
            </Text>
        );
    } else {
        videoContent = (
            <>
                {!videoDescriptionData && (
                    <>
                        <Text
                            size={TextSize.XL}
                            weight={TextWeight.BOLD}
                            className={cls.videoText}
                        >
                            Загруженное видео
                        </Text>
                        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                        <video className={cls.video} controls>
                            <source src={videoSrc} />
                        </video>
                        <CButton
                            color="primary"
                            size="lg"
                            className={cls.videoBtn}
                            onClick={getVideoDescriptionHandler}
                        >
                            Получить описание
                        </CButton>
                    </>
                )}
                {videoDescriptionData && (
                    <div className={cls.descrBlock}>
                        <Text
                            size={TextSize.XL}
                            weight={TextWeight.BOLD}
                            className={cls.videoText}
                        >
                            Описание к видео:
                        </Text>
                        <Text
                            size={TextSize.M}
                            weight={TextWeight.MEDIUM}
                        >
                            {videoDescriptionData.description}
                        </Text>
                        <CButton
                            color="primary"
                            size="lg"
                            className={cls.videoBtn}
                            onClick={() => { window.location.reload(); }}
                        >
                            Загрузить новое видео
                        </CButton>
                    </div>
                )}
            </>
        );
    }

    return (
        <div className={classNames(cls.MainPage, {}, [])}>
            <div className={cls.content}>
                {(!videoFile || !textFile) && (
                    <div className={cls.loadBlock}>
                        <div className={cls.buttons}>
                            <div className={cls.buttonBlock}>
                                <CButton
                                    color="primary"
                                    size="lg"
                                    className={classNames(cls.fileButton, { [cls.btnWithFile]: !!videoFile }, [])}
                                >
                                    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                                    <label htmlFor="file-video-upload" className={cls.fileInputLabel}>
                                        Загрузить видео
                                    </label>
                                </CButton>
                                {videoFile && (
                                    <div className={cls.fileName}>
                                        <span>{videoFile.name}</span>
                                    </div>
                                )}
                            </div>
                            <div className={cls.buttonBlock}>
                                <CButton
                                    color="primary"
                                    size="lg"
                                    className={classNames(cls.fileButton, { [cls.btnWithFile]: !!textFile }, [])}
                                >
                                    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                                    <label htmlFor="file-text-upload" className={cls.fileInputLabel}>
                                        Загрузить транскрибацию
                                    </label>
                                </CButton>
                                {textFile && (
                                    <div className={cls.fileName}>
                                        <span>{textFile.name}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <Text
                            theme={TextTheme.ERROR}
                            size={TextSize.M}
                            weight={TextWeight.SEMIBOLD}
                            className={classNames(
                                cls.errorText,
                                { [cls.withFileName]: !!(videoFile || textFile) },
                                [],
                            )}
                        >
                            Оба файла обязательны к прикреплению
                        </Text>
                    </div>
                )}
                {videoFile && textFile && (
                    <div className={cls.videoBlock}>
                        {videoContent}
                    </div>
                )}

                <input
                    className={cls.fileInput}
                    id="file-video-upload"
                    type="file"
                    accept="video/mp4"
                    onChange={handleVideoFileChange}
                />

                <input
                    className={cls.fileInput}
                    id="file-text-upload"
                    type="file"
                    accept="text/plain"
                    onChange={handleTextFileChange}
                />
            </div>

            <CToaster
                ref={toaster}
                push={toast}
                placement="top-center"
            />
        </div>
    );
};

export default MainPage;

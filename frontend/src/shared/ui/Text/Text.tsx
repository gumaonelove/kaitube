import { classNames } from 'shared/lib/helpers/classNames/classNames';
import React, { ReactNode } from 'react';
import { cilWarning } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import cls from './Text.module.scss';

export enum TextTheme {
    DEFAULT = 'default',
    ERROR = 'error',
    LIGHT = 'light',
}

export enum TextSize {
    S = 's',
    XM = 'xm',
    M = 'm',
    L = 'l',
    XL = 'xl',
}

export enum TextWeight {
    REGULAR = 'regular',
    MEDIUM = 'medium',
    SEMIBOLD = 'semibold',
    BOLD = 'bold',
    EXTRABOLD = 'extrabold'
}
interface TextProps {
    children?: ReactNode;
    className?: string;
    theme?: TextTheme;
    size?: TextSize;
    weight?: TextWeight;
}
export const Text = (props: TextProps) => {
    const {
        children,
        className,
        theme = TextTheme.DEFAULT,
        weight = TextWeight.REGULAR,
        size = TextSize.S,
    } = props;

    if (theme === TextTheme.ERROR) {
        return (
            <div className={classNames(
                cls.Text,
                {},
                [className, cls[theme], cls[size], cls[weight]],
            )}
            >
                <CIcon icon={cilWarning} customClassName={cls.errorIcon} />
                {children}
            </div>
        );
    }
    return (
        <div className={classNames(
            cls.Text,
            {},
            [className, cls[theme], cls[size], cls[weight]],
        )}
        >
            {children}
        </div>
    );
};

import React, { memo } from 'react';
import { CFooter } from '@coreui/react';
import KaiLogo from 'shared/assets/icons/kai_logo.png';
import cls from './Footer.module.scss';

export const Footer = memo(() => (
    <CFooter className={cls.footer}>
        <div>
            <span>KAITube</span>
            <span className="ms-1">&copy; 2023</span>
        </div>
        <div className={cls.icons}>
            <div className={cls.img}>
                <img src={KaiLogo} alt="kai-logo" />
            </div>
        </div>
        <div>
            <span className="me-1">Powered by</span>
            <span>Best developers</span>
        </div>
    </CFooter>
));

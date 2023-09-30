import { CToast, CToastBody } from '@coreui/react';
import { Text, TextSize } from 'shared/ui/Text/Text';
import CIcon from '@coreui/icons-react';
import { cilBurn, cilCheckCircle, cilInfo } from '@coreui/icons';
import cls from './Toast.module.scss';

export const Toast = {
    success: (text: string) => (
        <CToast autohide color="success" className="text-white align-items-center">
            <div className="d-flex">
                <CToastBody className={cls.body}>
                    <CIcon icon={cilCheckCircle} className="flex-shrink-0 me-2" width={24} height={24} />
                    <Text
                        size={TextSize.S}
                    >
                        {text}
                    </Text>
                </CToastBody>
            </div>
        </CToast>
    ),
    error: (text: string) => (
        <CToast autohide color="danger" className="text-white align-items-center">
            <div className="d-flex">
                <CToastBody className={cls.body}>
                    <CIcon icon={cilBurn} className="flex-shrink-0 me-2" width={24} height={24} />
                    <Text
                        size={TextSize.S}
                    >
                        {text}
                    </Text>
                </CToastBody>
            </div>
        </CToast>
    ),
};

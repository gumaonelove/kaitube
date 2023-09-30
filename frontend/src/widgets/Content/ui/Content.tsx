import React, { memo } from 'react';
import { CContainer } from '@coreui/react';

// routes config
import { AppRouter } from 'app/providers/router';

export const Content = memo(() => (
    <CContainer lg>
        <AppRouter />
    </CContainer>
));

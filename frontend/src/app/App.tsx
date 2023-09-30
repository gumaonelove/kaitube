import React, { Suspense } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { PageLoader } from 'widgets/PageLoader';
import DefaultLayout from 'shared/ui/DefaultLayout/DefaultLayout';

function App() {
    return (
        <div className={classNames('app', {}, [])}>
            <Suspense fallback={<PageLoader />}>
                <DefaultLayout />
            </Suspense>
        </div>
    );
}

export default App;

import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from 'app/providers/StoreProvider';
import App from './app/App';
import 'app/styles/index.scss';
import { ErrorBoundary } from './app/providers/ErrorBoundary';

render(
    <BrowserRouter basename="/">
        <StoreProvider>
            <ErrorBoundary>
                <App />
            </ErrorBoundary>
        </StoreProvider>
    </BrowserRouter>,
    document.getElementById('root'),
);

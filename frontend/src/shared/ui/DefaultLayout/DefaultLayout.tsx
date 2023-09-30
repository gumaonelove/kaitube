import React from 'react';
import { Sidebar } from 'widgets/Sidebar';
import { Header } from 'widgets/Header';
import { Content } from 'widgets/Content';
import { Footer } from 'widgets/Footer';

const DefaultLayout = () => (
    <div>
        <Sidebar />
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
            <Header />
            <div className="body flex-grow-1 px-3">
                <Content />
            </div>
            <Footer />
        </div>
    </div>
);

export default DefaultLayout;

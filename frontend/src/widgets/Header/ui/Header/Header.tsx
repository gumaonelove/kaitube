import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
    CContainer,
    CHeader,
    CHeaderBrand,
    CHeaderDivider,
    CHeaderNav,
    CHeaderToggler,
    CNavItem,
    CNavLink,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import {
    cilBell, cilEnvelopeOpen, cilList, cilMenu,
} from '@coreui/icons';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { sidebarActions } from 'widgets/Sidebar';
import HeaderDropdown from '../HeaderDropdown/HeaderDropdown';
import cls from './Header.module.scss';

export const Header = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();

    return (
        <CHeader position="sticky" className="mb-4">
            <CContainer fluid>
                <CHeaderToggler
                    className="ps-1"
                    onClick={() => dispatch(sidebarActions.toggleShow())}
                >
                    <CIcon icon={cilMenu} size="lg" />
                </CHeaderToggler>
                <CHeaderBrand
                    className="mx-auto d-md-none"
                    // @ts-ignore
                    to="/"
                >
                    <span className="header-mobile-logo">KAITube</span>
                </CHeaderBrand>
                <CHeaderNav className="d-none d-md-flex me-auto">
                    <CNavItem>
                        <CNavLink to="/" component={NavLink}>
                            Описание к видео
                        </CNavLink>
                    </CNavItem>
                </CHeaderNav>
            </CContainer>
        </CHeader>
    );
};

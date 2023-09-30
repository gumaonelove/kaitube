import React, { memo } from 'react';
import {
    CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler,
} from '@coreui/react';

import SimpleBar from 'simplebar-react';
import './Sidebar.module.scss';

// sidebar nav config
import { SidebarNav } from 'widgets/SidebarNav';
import _nav from 'shared/config/navbarConfig/navbarConfig';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { getSidebarShow, getSidebarUnfoldable, sidebarActions } from 'widgets/Sidebar';
import cls from 'widgets/Footer/ui/Footer.module.scss';
import KaiLogo from 'shared/assets/icons/kai_logo.png';
import { Text, TextSize, TextWeight } from 'shared/ui/Text/Text';

export const Sidebar = memo(() => {
    const dispatch = useAppDispatch();
    const unfoldable = useSelector(getSidebarUnfoldable);
    const sidebarShow = useSelector(getSidebarShow);

    return (
        <CSidebar
            position="fixed"
            unfoldable={unfoldable}
            visible={sidebarShow}
            onVisibleChange={(visible) => {
                dispatch(sidebarActions.setShow(visible));
            }}
        >
            <CSidebarBrand className="d-none d-md-flex">
                <div className={cls.img}>
                    <img src={KaiLogo} alt="kai-logo" />
                </div>
                <span className="sidebar-logotype">
                    <Text
                        weight={TextWeight.SEMIBOLD}
                        size={TextSize.M}
                    >
                        Tube
                    </Text>
                </span>
            </CSidebarBrand>
            <CSidebarNav>
                <SimpleBar>
                    <SidebarNav items={_nav} />
                </SimpleBar>
            </CSidebarNav>
            <CSidebarToggler
                className="d-none d-lg-flex"
                onClick={() => dispatch(sidebarActions.toggleUnfoldable())}
            />
        </CSidebar>
    );
});

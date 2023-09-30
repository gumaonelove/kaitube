import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import { CBadge } from '@coreui/react';

export const SidebarNav = ({ items }: any) => {
    const location = useLocation();
    const navLink = (name: string, icon: any, badge?: any) => (
        <>
            {icon && icon}
            {name && name}
            {badge && (
                <CBadge color={badge.color} className="ms-auto">
                    {badge.text}
                </CBadge>
            )}
        </>
    );

    const navItem = (item: any, index: any) => {
        const {
            component, name, badge, icon, ...rest
        } = item;
        const Component = component;
        return (
            <Component
                {...(rest.to
                    && !rest.items && !rest.disabled && {
                    component: NavLink,
                })}
                key={index}
                {...rest}
            >
                {navLink(name, icon, badge)}
            </Component>
        );
    };
    const navGroup = (item: any, index: any) => {
        const {
            component, name, icon, to, ...rest
        } = item;
        const Component = component;

        return (
            <Component
                idx={String(index)}
                key={index}
                toggler={navLink(name, icon)}
                visible={location.pathname.startsWith(to)}
                {...rest}
            >

                {
                    item.items?.map((item: any, index: any) => (item.items ? navGroup(item, index) : navItem(item, index)))
                }
            </Component>
        );
    };

    return (
        items && items.map((item: any, index: any) => (item.items ? navGroup(item, index) : navItem(item, index)))
    );
};

SidebarNav.propTypes = {
    items: PropTypes.arrayOf(PropTypes.any).isRequired as any,
};

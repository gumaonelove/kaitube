import React, { memo } from 'react';
import { useLocation } from 'react-router-dom';

import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react';
import routes from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './Breadcrumb.module.scss';

export interface BreadcrumbList {
    id: number;
    name: string;
    pathname?: string;
    items: BreadcrumbList[] | null;
    active: boolean;
}
interface BreadcrumbProps {
    className?: string;
}
export const Breadcrumb = memo((props: BreadcrumbProps) => {
    const {
        className,
    } = props;
    const currentLocation = useLocation().pathname;

    const getRouteName = (pathname: string, routes: any[]) => {
        const currentRoute = routes.find((route) => route.path === pathname);
        return currentRoute ? currentRoute.name : false;
    };

    const getBreadcrumbs = (location: string) => {
        const breadcrumbs: any[] = [];
        location.split('/').reduce((prev, curr, index, array) => {
            const currentPathname = `${prev}/${curr}`;
            const routeName = getRouteName(currentPathname, routes);
            // eslint-disable-next-line no-unused-expressions
            routeName
            && breadcrumbs.push({
                pathname: currentPathname,
                name: routeName,
                active: index + 1 === array.length,
            });
            return currentPathname;
        });
        return breadcrumbs;
    };

    const breadcrumbs = getBreadcrumbs(currentLocation);

    // eslint-disable-next-line implicit-arrow-linebreak

    return (
        (
            <CBreadcrumb className={classNames(cls.Breadcrumbs, {}, ['m-0 ms-2', className])}>
                {
                    breadcrumbs.map((breadcrumb) => (
                        <CBreadcrumbItem
                            {...(breadcrumb.active ? { active: true } : { href: breadcrumb.pathname })}
                            key={breadcrumb.name}
                        >
                            {breadcrumb.name}
                        </CBreadcrumbItem>
                    ))
                }
            </CBreadcrumb>
        )
    );
});

/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id      : 'dashboards',
        title   : 'منو',
        subtitle: '',
        type    : 'group',
        icon    : 'heroicons_outline:home',
        children: [
            {
                id   : 'dashboards.monitoring',
                title: 'monitoring',
                type : 'basic',
                icon : 'heroicons_outline:clipboard-check',
                link : '/monitoring'
            },
            {
                id   : 'dashboards.unit',
                title: 'unit_list',
                type : 'basic',
                icon : 'heroicons_outline:clipboard-check',
                link : '/unitList'
            },

        ]
    },
    
    
];
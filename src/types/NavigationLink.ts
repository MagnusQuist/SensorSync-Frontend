export interface NavigationLink {
    path: string,
    meta: {
        showInMenu: boolean,
        iconName: string,
        variant: 'default' | 'ghost',
        title: string,
        label?: string,
    },
}
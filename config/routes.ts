import { User, UserPlus } from 'lucide-react';

export interface Route {
  title: string;
  url: string;
  icon?: React.ComponentType<{ className?: string }>;
  breadcrumbs?: BreadcrumbItem[];
  showInSidebar: boolean;
}

export interface BreadcrumbItem {
  title: string;
  url: string;
}

export const routes: Route[] = [
  {
    title: 'Users',
    url: '/dashboard/users',
    icon: User,
    breadcrumbs: [
      {
        title: 'Users',
        url: '/dashboard/users',
      },
      {
        title: 'All Users',
        url: '/dashboard/users',
      },
    ],
    showInSidebar: true,
  },
  {
    title: 'Create User',
    url: '/dashboard/users/create',
    icon: UserPlus,
    breadcrumbs: [
      {
        title: 'Users',
        url: '/dashboard/users',
      },
      {
        title: 'Create User',
        url: '/dashboard/users/create',
      },
    ],
    showInSidebar: false,
  },
];

export function getRouteByPath(path: string): Route | undefined {
  return routes.find((route) => route.url === path);
}

export function getBreadcrumbs(path: string): BreadcrumbItem[] {
  const currentRoute = getRouteByPath(path);
  if (!currentRoute) return [];

  return currentRoute.breadcrumbs || [];
}

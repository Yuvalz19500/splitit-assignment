import { User, UserPen, UserPlus } from 'lucide-react';

export interface Route {
  title: string;
  url: string;
  icon?: React.ComponentType<{ className?: string }>;
  breadcrumbs?: BreadcrumbItem[];
  showInSidebar: boolean;
}

export interface BreadcrumbItem {
  title: string;
  url?: string;
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
      },
    ],
    showInSidebar: false,
  },
  {
    title: 'Edit User',
    url: '/dashboard/users/[id]',
    icon: UserPen,
    breadcrumbs: [
      {
        title: 'Users',
        url: '/dashboard/users',
      },
      {
        title: 'Edit User',
      },
    ],
    showInSidebar: false,
  },
];

function convertRoutePatternToRegex(pattern: string): RegExp {
  const regexPattern = pattern.replace(/\[([^\]]+)\]/g, '[^/]+');
  return new RegExp(`^${regexPattern}$`);
}

export function getRouteByPath(path: string): Route | undefined {
  const exactMatch = routes.find((route) => route.url === path);
  if (exactMatch) return exactMatch;

  return routes.find((route) => {
    if (route.url.includes('[')) {
      const regex = convertRoutePatternToRegex(route.url);
      return regex.test(path);
    }
    return false;
  });
}

export function getBreadcrumbs(path: string): BreadcrumbItem[] {
  const currentRoute = getRouteByPath(path);
  if (!currentRoute) return [];

  return currentRoute.breadcrumbs || [];
}

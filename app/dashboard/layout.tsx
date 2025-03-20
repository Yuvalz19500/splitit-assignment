'use client';

import * as React from 'react';
import { AppSidebar } from '@/components/app-sidebar';
import { getBreadcrumbs } from '@/config/routes';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';
import { ThemeModeToggle } from '@/components/theme-mode-toggle';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const breadcrumbs = getBreadcrumbs(pathname);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-2 border-b px-4'>
          <div className='flex items-center gap-2'>
            <SidebarTrigger />
            <Separator orientation='vertical' className='mr-2 h-4' />
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((route, index) => (
                  <React.Fragment key={`${route.url}-${index}`}>
                    <BreadcrumbItem className='hidden md:block'>
                      {index === breadcrumbs.length - 1 ? (
                        <BreadcrumbPage>{route.title}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink href={route.url}>
                          {route.title}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {index < breadcrumbs.length - 1 && (
                      <BreadcrumbSeparator className='hidden md:block' />
                    )}
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className='grow' />
          <ThemeModeToggle />
        </header>
        <div className='flex flex-1 flex-col gap-4 p-4'>{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}

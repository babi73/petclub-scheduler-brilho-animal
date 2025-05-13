
import React from 'react';
import { SidebarProvider as BaseSidebarProvider } from "@/components/ui/sidebar";

interface AppSidebarProviderProps {
  children: React.ReactNode;
}

export function AppSidebarProvider({ children }: AppSidebarProviderProps) {
  return (
    // The sidebar component doesn't accept collapsedWidth prop, so we'll remove it
    <BaseSidebarProvider>
      {children}
    </BaseSidebarProvider>
  );
}

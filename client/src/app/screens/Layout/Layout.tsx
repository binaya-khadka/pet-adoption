import React from 'react';
import { Nav } from '@/app/components';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: '##E1F0DA' }}>
      <header>
        <Nav />
      </header>
      <main>{children}</main>
    </div>
  );
}

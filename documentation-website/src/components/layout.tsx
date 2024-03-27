import DefaultMeta from './default-meta.tsx';
import Header from './header.tsx';
import Footer from './footer.tsx';
import React from 'react';
import Breadcrumbs from './breadcrumbs.tsx';

interface LayoutProps {
  Outlet: React.ReactNode,
  page?: string,
  path?: string,
  canonical?: string,
}

const Layout = ({
  Outlet,
  page = '',
  path = '',
  canonical = '',
}: LayoutProps,) => {
  const meta = page
    ? <DefaultMeta page={page} path={canonical || path}/>
    : '';
  return <>
    {meta}
    <Header window={window || {}}/>
    <Breadcrumbs path={path}/>
    <article>
      {Outlet}
    </article>
    <Footer/>
  </>;
};

export default Layout;

import React from 'react';
//
import Head from '../components/Head'
import LibLayout from '../client/lib/LibLayout';
LibLayout.startProc();
//
const Layout = ({ children }) => {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
// <header>Header</header>
// <footer>Footer</footer>
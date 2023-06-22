import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import { LayoutWrapper } from './Pages.styled';

const Layout: FC = () => {
  return (
    <LayoutWrapper>
           <Header />
      <div>
        <Outlet />
      </div>
    </LayoutWrapper>
  );
};

export default Layout;

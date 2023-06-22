import { FC } from 'react';
import { HeaderLink, HeaderWrapper } from './Header.styled';

const Header: FC = () => {
  return (
    <HeaderWrapper>
      <div>
        <HeaderLink to={'/signin'} className={({ isActive }) => (isActive ? 'active' : '')}>
          SignIn
        </HeaderLink>
        <HeaderLink to={'/signup'}>SignUp</HeaderLink>
      </div>
    </HeaderWrapper>
  );
};

export default Header;

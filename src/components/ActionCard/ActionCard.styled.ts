import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

export const HeaderWrapper = styled.header`
  width: 100%;
  z-index: 1;
  background-color: #5380c9;
  height: 54px;

  padding: 20px;
`;

export const HeaderLink = styled(NavLink)`
  &:not(:last-child) {
    margin-right: 20px;
  }

  font-size: 24px;
  font-weight: bold;
  color: white;

  &.active {
    color: bisque;
  }
`;

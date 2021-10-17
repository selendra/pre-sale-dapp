import { Link } from 'react-router-dom';
import { Drawer } from 'antd';
import styled from 'styled-components/macro';

export const Wrapper = styled.header`
  width: 100%;
  padding: 20px 0px;
  border-bottom: 2px solid #1c274f;
`;
export const Container = styled.div`
  max-width: 1216px;
  height: 50px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const HeaderItems = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
  /* grid-gap: 40px; */
  align-items: center;
`;
export const Item = styled(Link)`
  display: block;
  font-size: 16px;
  font-weight: ${({ active }) => (active === 'true' ? '700' : '500')};
  color: ${({ active }) => (active === 'true' ? '#f39d0c' : '#fff')};
  background: ${({ active }) => (active === 'true' ? '#f39d0c42' : 'none')};
  width: ${({mobile}) => mobile === 'true' ? '100%' : '140px' };
  height: 54px;
  line-height: 54px;
  text-align: center;
  border-radius: 8px;
  background-size: 150% 150%;
  transition: 0.3s;
  :hover {
    color: #f39d0c;
  }
`;
export const Logo = styled.img`
  height: 60px;
  width: auto;
`;
export const MenuIcon = styled.img`
  cursor: pointer;
`;
export const DrawerStyled = styled(Drawer)`
  .ant-drawer-body {
    background: ${({ theme }) => theme.colors.background1};
  }
  .anticon {
    display: none;
  }
`;


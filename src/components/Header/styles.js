import { Link } from "react-router-dom";
import { Button, Drawer } from 'antd';
import styled from "styled-components/macro";

export const Wrapper = styled.header`
  width: 100%;
  border-bottom: 2px solid #1c274f;
`
export const Container = styled.div`
  max-width: 1216px;
  height: 60px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const HeaderItems = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  /* grid-gap: 40px; */
  align-items: center;
`
export const Item = styled(Link)`
  display: block;
  font-size: 16px;
  font-weight: 500;
  color: #FFF;
  background: ${({active}) => active === 'true' ? 'linear-gradient(to right, #8e2de2, #4a00e0)' : 'none'};
  width: ${({mobile}) => mobile ? '100%' : '120px'};
  text-align: center;
  padding: 8px;
  border-radius: 5px;
  background-size: 150% 150%;
  transition: .5s;
  :hover {
    color: #fff;
    background: linear-gradient(to right, #8e2de2, #4a00e0);
    background-position: 99% 50%;
  }
`
export const Logo = styled.img`
  height: 50px;
  width: auto;
`
export const BtnConnect = styled(Button)`
  width: 200px;
  height: 40px;
  color: #F49D09;
  border: 1.5px solid #6a7cff;
  border-radius: 12px;
  padding: 0 6px;
  :hover {
    color: #fac66b;
    border-color: #fac66b;
  }
`
export const MenuIcon = styled.img`
  cursor: pointer;
`
export const DrawerStyled = styled(Drawer)`
  .ant-drawer-body {
    background: ${({theme}) => theme.colors.background1};
  }
  .anticon {
    display: none;
  }
`
// export const NavItems = styled.
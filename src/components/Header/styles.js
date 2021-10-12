import { Link } from 'react-router-dom';
import { Button, Drawer, Modal } from 'antd';
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
export const BtnConnect = styled(Button)`
  width: 200px;
  overflow: hidden;
  height: 54px;
  color: #fff;
  border: 2px solid #f39d0c;
  background: #f39d0c42;
  border-radius: 12px;
  padding: 0px 6px;
  font-weight: bold;
  img {
    position: relative;
    right: 10px;
  }
  :hover {
    color: #fac66b;
    border-color: #f39d0c;
  }
  :focus {
    border-color: #f39d0c;
    color: #f39d0c;
  }
  @media screen and (max-width: 375px) {
    width: 120px;
    padding: 0 20px;
    overflow: hidden;
  }
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
export const ModalStyled = styled(Modal)`
  .ant-modal-content {
    border-radius: 16px;
  }
`;

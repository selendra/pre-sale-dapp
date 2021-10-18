import { Button, Dropdown, Menu } from "antd";
import styled from "styled-components";

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
  @media screen and (max-width: 480px) {
    width: 120px;
    padding: 0 20px;
    overflow: hidden;
  }
`;
export const DropdownStyled = styled(Dropdown)`
  width: 200px;
  overflow: hidden;
  height: 54px;
  color: #fff;
  border: 2px solid #f39d0c;
  background: #f39d0c42;
  border-radius: 12px;
  padding: 0px 6px;
  font-weight: bold;
  @media screen and (max-width: 480px) {
    width: 120px;
    padding: 0 10px;
    overflow: hidden;
  }
`;
export const Network = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: 0.4s;
  padding: 2rem 0;
  :hover {
    opacity: .6;
  }
  p {
    font-weight: 600;
    margin-top: 10px;
  }
`;
export const MenuStyled = styled(Menu)`
  background: #f39d0c;
  color: #fff;
  border-radius: 10px;
`
export const MenuItem = styled(Menu.Item)`
  color: #fff;
  font-weight: 600;
  :hover {
    background: none;
    opacity: .7;
  }
`
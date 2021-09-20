import { NavLink } from "react-router-dom";
import { Button } from 'antd';
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
  grid-gap: 40px;
  align-items: center;
`
export const Logo = styled.img`
  height: 50px;
  width: auto;
`
export const Item = styled(NavLink)`
  font-size: 16px;
  font-weight: 500;
  color: #FFF;
`
export const BtnConnect = styled(Button)`
  height: 40px;
  color: rgb(3, 169, 244);
  border: 1px solid rgb(3, 169, 244);
  border-radius: 5px;
  padding: 0 6px;
`
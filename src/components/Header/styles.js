import { Link } from "react-router-dom";
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
  /* grid-gap: 40px; */
  align-items: center;
`
export const Item = styled(Link)`
  font-size: 16px;
  font-weight: 500;
  color: #FFF;
  background: ${({active}) => active === 'true' ? 'linear-gradient(to right, #8e2de2, #4a00e0)' : 'none'};
  width: 120px;
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
  border: 1px solid #F49D09;
  border-radius: 16px;
  padding: 0 6px;
  :hover {
    color: #fac66b;
    border-color: #fac66b;
  }
`
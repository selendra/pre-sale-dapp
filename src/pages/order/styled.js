import { Collapse, Button } from "antd";
import styled from "styled-components";

export const Container = styled.div`
  max-width: 400px;
  min-height: calc(100vh - 120px);
  margin: auto;
  padding: 14rem 0;
  @media screen and (max-width: 500px) {
    padding: 10rem 10px;
  }
`
export const CardStyled = styled.div`
  max-width: 400px;
  max-height: 650px;
  margin: auto;
  background-color: #111730;
  border-radius: 16px;
  padding: 15px;
  overflow-y: scroll;
  scrollbar-width: thin;
  scrollbar-color: #6969dd #111730;
`
export const Title = styled.p`
  font-weight: 600;
  font-size: 20px;
`
export const Text = styled.p`
  margin: 0;
  text-align: center;
`
export const CollapseStyled = styled(Collapse)`
  align-items: center;
  background-color: #0D1225;
  border: none;
  border-radius: 16px;
  margin-bottom: 20px;
  .ant-collapse-item {
    border: none;
  }
  .ant-collapse-item > .ant-collapse-header {
    color: #fff;
    height: 70px;
    line-height: 45px;
  }
  .ant-collapse-content {
    background-color: #0D1225;
  }
  .ant-collapse-item:last-child > .ant-collapse-content {
    color: #fff;
    border: none;
    border-radius: 16px;
  }
`
export const BtnClaim = styled(Button)`
  border-radius: 16px;
  width: 100%;
  height: 40px;
  color: #fff;
  border-color: #F49D09;
  font-weight: 500;
  :hover {
    color: #F49D09;
    border-color: #F49D09;
  }
`
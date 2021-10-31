import styled from "styled-components"
import { Card, Input, Form, Collapse } from 'antd';

export const Container = styled.div`
  max-width: 500px;
  min-height: calc(100vh - 120px);
  margin: auto;
  padding: 4rem 0;
  @media screen and (max-width: 500px) {
    padding: 20px 10px;
  }
`
export const CardStyled = styled(Card)`
  border: none;
  background-color: #111730;
  border-radius: 16px;
`;
export const FormItem = styled(Form.Item)`
  display: flex;
  background: #000829;
  border-radius: 16px;
  label {
    font-weight: 700;
    color: #85858d;
    padding: 10px;
  }
  input {
    border-radius: 16px;
  }
`;
export const InputStyled = styled(Input)`
  width: ${({fullwidth}) => fullwidth === 'true' ? '100%' : '60%'};
  font-size: 20px;
  font-weight: 800;
  color: #fff;
  background: #000829;
  border-radius: 5px;
  border: none;
  padding: 0.75rem 0.75rem 0.75rem 1rem;
  &:focus {
    box-shadow: none !important;
  }
`;
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
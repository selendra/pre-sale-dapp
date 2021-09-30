import styled, { keyframes } from "styled-components"
import { 
  Button, 
  Card, 
  Form, 
  Input,
  Modal
} from "antd"

export const Container = styled.div`
  max-width: 400px;
  min-height: calc(100vh - 120px);
  margin: auto;
  padding: 14rem 0;
`
export const CardStyled = styled(Card)`
  border: none;
  background-color: #111730;
  border-radius: 16px;
`
export const FormItem = styled(Form.Item)`
  display: flex;
  background: #000829;
  border-radius: 16px;
  label {
    font-weight: 700;
    color: #85858D;  
    padding: 10px;
  }
  input {
    border-radius: 16px;
  }
`
export const InputStyled = styled(Input)`
  width: 60%;
  font-size: 20px;
  font-weight: 800;
  color: #FFF;
  background: #000829;
  border-radius: 5px;
  border: none;
  padding: .75rem .75rem .75rem 1rem;
  &:focus {
    box-shadow: none!important;
  }
`
export const BtnContribute = styled(Button)`
  position: relative;
  width: 352px;
  height: 55px;
  border-radius: 16px;
  border: none;
  font-weight: 600;
  color: #f1f1f2;
  background: linear-gradient(to right, #8e2de2, #4a00e0);
  background-size: 150% 150%;
  transition: .5s;
  :hover {
    color: #fff;
    filter: brightness(.85);
    background: linear-gradient(to right, #8e2de2, #4a00e0);
    background-position: 99% 50%;
  }
  :focus {
    color: #fff;
    filter: brightness(.85);
    background: linear-gradient(to right, #8e2de2, #4a00e0);
    background-position: 99% 50%;
  }
`
export const BtnSelect = styled(Button)`
  width: 100%;
  color: #fff;
  background: ${({active}) => active === 'true' ? '#5ac4be' : '#131a35'} ;
  border: none;
  border-radius: 5px;
  :focus,
  :hover {
    background: #5ac4be;
    color: #fff;
  }
`
export const Subtitle = styled.p`
  padding: 15px 0;
  font-size: 24px;
  font-weight: 600;
  margin: 0;
`
export const Text = styled.p`
  font-size: 14px;
  color: #f1f1f2;
  display: flex;
  margin: 0 10px;
`
export const ModalStyled = styled(Modal)`
  border-radius: 16px;
  .ant-modal-content {
    border-radius: 16px;
  }
  .ant-modal-header {
    border-radius: 16px 16px 0 0;
  }
`
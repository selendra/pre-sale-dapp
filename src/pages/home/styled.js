import styled from "styled-components"
import { 
  Button, 
  Card, 
  Form, 
  Input, 
  Select 
} from "antd"

export const Container = styled.div`
  max-width: 400px;
  min-height: calc(100vh - 120px);
  margin: auto;
  padding: 14rem 0;
`
export const CardStyled = styled(Card)`
  border: 1px solid rgb(90, 196, 190);
  background-color: transparent;
  border-radius: 5px;
`
export const FormItem = styled(Form.Item)`
  display: flex;
  background: #000829;
  border-radius: 4px;
  label {
    font-weight: 700;
    color: #85858D;  
    padding: 10px;
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
  border: 1px solid rgb(90, 196, 190);
  border-radius: 5px;
  height: 50px;
  width: 100%;
  background: transparent;
  color: #f5f5f5;
  :hover,
  :focus {
    background-color: transparent;
    border-color: rgb(90, 196, 190);
    color: rgb(90, 196, 190);
  }
`
export const BtnSelect = styled(Button)`
  width: 100%;
  color: #fff;
  background: #131a35;
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

import styled, { keyframes } from "styled-components"
import { 
  Button, 
  Card, 
  Form, 
  Input
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
const effect = keyframes`
  100% {
    transform: rotate(360deg);
  }
`
export const BtnContribute = styled.div`
  position: relative;
  width: 352px;
  height: 55px;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  &:before {
    content: "";
    position: absolute;
    width: 355px;
    height: 355px;
    background: conic-gradient(#F49D09, #fac66b);
    animation: ${effect} 1.3s ease infinite;
    transition: 1s ease;
  }
  a {
    position: absolute;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    width: 345px;
    height: 50px;
    color: #fff;
    background: #111730;
    text-align: center;
    text-decoration: none;
    line-height: 52px;
    border-radius: 16px;
    :hover {
      color: #fac66b;
    }
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
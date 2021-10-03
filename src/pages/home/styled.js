import styled from 'styled-components';
import { Button, Card, Form, Input, Modal, Alert } from 'antd';

export const Container = styled.div`
  max-width: 500px;
  min-height: calc(100vh - 120px);
  margin: auto;
  padding: 14rem 0;
  p {
    font-size: 18px;
  }
  @media screen and (max-width: 500px) {
    padding: 10rem 10px;
  }
`;
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
  width: 60%;
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
export const BtnContribute = styled(Button)`
  position: relative;
  /* max-width: 352px; */
  width: 100%;
  height: 55px;
  border-radius: 12px;
  border: none;
  font-weight: 800;
  color: #333;
  background: #f39d0c;
  background: #f2994a; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #f2c94c,
    #f2994a
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #f2c94c,
    #f2994a
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  background-size: 150% 150%;
  transition: 0.5s;
  :hover {
    color: #fff;
    background: #f2994a; /* fallback for old browsers */
    background: -webkit-linear-gradient(
      to right,
      #f2c94c,
      #f2994a
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      to right,
      #f2c94c,
      #f2994a
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
  :focus {
    color: #fff;
    background: #f39d0c;
  }
  :before {
    background: #f2994a; /* fallback for old browsers */
    background: -webkit-linear-gradient(
      to right,
      #f2c94c,
      #f2994a
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      to right,
      #f2c94c,
      #f2994a
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
`;
export const BtnSelect = styled(Button)`
  width: 100%;
  height: 40px;
  font-weight: 800;
  color: #fff;
  background: ${({ active }) => (active === 'true' ? '#f39d0c' : '#131a35')};
  border: none;
  border-radius: 5px;
  :focus,
  :hover {
    background: #f39d0c4a;
    color: #fff;
  }
`;
export const Subtitle = styled.p`
  padding: 15px 0;
  font-size: 26px !important;
  font-weight: 800;
  margin: 0;
  color: #f39d0c;
`;
export const Text = styled.p`
  font-size: 18px;
  color: #f1f1f2;
  display: flex;
  margin: 0 10px;
  font-weight: 800;
`;
export const ModalStyled = styled(Modal)`
  border-radius: 16px;
  .ant-modal-content {
    border-radius: 16px;
  }
  .ant-modal-header {
    border-radius: 16px 16px 0 0;
  }
`;
export const AlertStyled = styled(Alert)`
  background: none;
  .ant-alert-message {
    color: red;
  }
`
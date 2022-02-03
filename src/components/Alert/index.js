import React from 'react';
import { Alert } from "antd";
import styled from 'styled-components';

export default function AlertComponent() {
  const ErrMsg = "Presale has ended. Thanks for your participate";
  return (
    <AlertStyled message={ErrMsg} type="error" showIcon />
  );
}

const AlertStyled = styled(Alert)`
  max-width: 380px;
  margin: 20px auto;
`

import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const GlobalStyles = createGlobalStyle`
  ${normalize};

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  html {
    font-size: 62.5%;
    scroll-behavior: smooth;
  }
  body {
    font-family: ${(props) => props.theme.fonts.main};
    font-size: 1.6rem;
    background: ${({ theme }) => theme.colors.background1};
    color: ${(props) => props.theme.colors.primary1};
    cursor: default;
  }
  h1,h2,h3,h4,h5,h6,button {
    font-family: ${(props) => props.theme.fonts.title};
  }
  a {
    text-decoration: none;
  }
  li{
    list-style: none;
  }
  .ant-modal-content,
  .ant-modal-header,
  .ant-popover-inner,
  .ant-popover-inner-content {
    background: #1c274f;
    color: #fff;
  }
  .ant-modal-title {
    color: #f1f1f5;
  }
  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    background-color: transparent;
    border: none;
  }
  .ant-select-item-option:hover,
  .ant-select-item-option-active:not(.ant-select-item-option-disabled),
  .ant-select-item .ant-select-item-option .custom-option .ant-select-item-option-active   {
    background: #283871;
  }
  .ant-select-arrow {
    color: #fff;
  }
  .ant-modal-close-x {
    color: #f1f1f2;
  }
  .home-title{
    font-size: 34px !important;
    font-weight: bold;
    margin-bottom: 0px;
    color: #f39d0c;
  }
  .home-sub-title{
    font-size: 20px !important;
    margin-bottom: 0px;
  }
`;

export default GlobalStyles;

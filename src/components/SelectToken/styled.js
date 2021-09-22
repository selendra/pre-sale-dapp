import styled from "styled-components"
import {
  Select 
} from 'antd'

export const SortSelect = styled(Select)`
  .ant-select-item-option-active:hover {
    background: #000
  }
`
export const SortOption = styled(Select.Option)`
  color: red!important
`
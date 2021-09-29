import { Card } from "antd"
import styled from "styled-components"

export const Container = styled.div`
  max-width: 1216px;
  min-height: calc(100vh - 120px);
  margin: auto;
  padding: 4rem 0;
`
export const CardStyled = styled(Card)`
  width: 100%;
  min-width: 320px;
  border: 1px solid rgb(90, 196, 190);
  background-color: transparent;
  border-radius: 5px;
  text-align: center;
  margin-top: 11rem;
`
export const Background = styled.div`
  color: #fff;
  background: #1a2843;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
`
export const Title = styled.h2`
  font-size: 120px;
  font-weight: 900;
  color: #2B3149;
  position: absolute;
`
export const SubTitle = styled.p`
  font-size: 32px;
  font-weight: 400;
  color: #A1A3AE;
`
export const Text = styled.p`
  font-size: 22px;
  font-weight: 500;
  color: #D0D1D7;
`
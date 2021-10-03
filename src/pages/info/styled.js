import { Card } from 'antd';
import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1216px;
  min-height: calc(100vh - 120px);
  margin: auto;
  padding: 4rem 0;
  @media screen and (max-width: 500px) {
    padding: 20px 10px;
  }
`;
export const CardStyled = styled(Card)`
  width: 100%;
  min-width: 320px;
  border: 2px solid #f39d0c;
  background-color: #f39d0c42;
  border-radius: 12px;
  text-align: center;
  margin-top: 11rem;
`;
export const Background = styled.div`
  color: #fff;
  background: #1a2843;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
`;
export const Title = styled.h2`
  font-size: 120px;
  font-weight: 900;
  color: #2b3149;
  position: absolute;
`;
export const SubTitle = styled.p`
  font-size: 26px;
  font-weight: 600;
  color: #f9f9f9;
  margin-bottom: 5px;
`;
export const Text = styled.p`
  font-size: 28px;
  font-weight: 800;
  color: #f39d0c;
`;
